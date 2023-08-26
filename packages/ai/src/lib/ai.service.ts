import { pinoOptions } from '@puschel/core';
import { io } from '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs-node';
import { pino } from 'pino';

import { makePredictions, trainModel } from './model';

export const logger = pino(pinoOptions('AI'));

export interface AiModelArtifacts {
  id?: number;
  createDate: Date;
  modelTopology?: string;
  trainingConfig?: string;
  weightSpecs?: string;
  weightData?: string;

  /* Plain strings */
  format?: string;
  generatedBy?: string;
  convertedBy?: string | null;

  signature?: string;
  modelInitializer?: string;
  initializerSignature?: string;
  userDefinedMetadata?: string;
}

export interface AiIoHandlerService {
  save(modelArtifacts: AiModelArtifacts): Promise<AiModelArtifacts>;
  load(id: number): Promise<AiModelArtifacts>;
}

export class AiIoHandler {
  private readonly logger = logger;
  constructor(private readonly aiIoHandlerService: AiIoHandlerService) {}

  async save(
    modelArtifacts: io.ModelArtifacts,
    createDate: Date
  ): Promise<io.SaveResult> {
    this.logger.debug('Transforming model artifacts for writing');
    const newModelArtifacts: AiModelArtifacts = {
      createDate: createDate,
      modelTopology: modelArtifacts.modelTopology
        ? JSON.stringify(modelArtifacts.modelTopology)
        : undefined,
      trainingConfig:
        modelArtifacts.trainingConfig &&
        JSON.stringify(modelArtifacts.trainingConfig),
      weightSpecs:
        modelArtifacts.weightSpecs &&
        JSON.stringify(modelArtifacts.weightSpecs),
      weightData:
        modelArtifacts.weightData &&
        Object.keys(modelArtifacts.weightData).length !== 0
          ? JSON.stringify(modelArtifacts.weightData)
          : null,
      format: modelArtifacts.format,
      generatedBy: modelArtifacts.generatedBy,
      convertedBy: modelArtifacts.convertedBy,
      signature:
        modelArtifacts.signature && JSON.stringify(modelArtifacts.signature),
      modelInitializer:
        modelArtifacts.signature &&
        JSON.stringify(modelArtifacts.modelInitializer),
      initializerSignature:
        modelArtifacts.signature &&
        JSON.stringify(modelArtifacts.modelInitializer),
      userDefinedMetadata:
        modelArtifacts.userDefinedMetadata &&
        JSON.stringify(modelArtifacts.userDefinedMetadata),
    };
    return this.aiIoHandlerService.save(newModelArtifacts).then(() => ({
      modelArtifactsInfo: {
        dateSaved: newModelArtifacts.createDate,
        modelTopologyType: 'JSON',
      },
    }));
  }
  loadById(id: number): Promise<io.ModelArtifacts> {
    this.logger.debug('Transforming model artifacts for reading');
    return this.aiIoHandlerService.load(id).then((modelArtifacts) => {
      if (!modelArtifacts) {
        this.logger.warn('Model not found, skipping');
        return null;
      }
      return {
        // createDate: modelArtifacts.createDate,
        modelTopology: modelArtifacts.modelTopology
          ? JSON.parse(modelArtifacts.modelTopology)
          : undefined,
        trainingConfig: modelArtifacts.trainingConfig
          ? JSON.parse(modelArtifacts.trainingConfig)
          : undefined,
        weightSpecs: modelArtifacts.weightSpecs
          ? JSON.parse(modelArtifacts.weightSpecs)
          : undefined,
        weightData: modelArtifacts.weightData
          ? JSON.parse(modelArtifacts.weightData)
          : undefined,
        format: modelArtifacts.format,
        generatedBy: modelArtifacts.generatedBy,
        convertedBy: modelArtifacts.convertedBy,
        signature: modelArtifacts.signature
          ? JSON.parse(modelArtifacts.signature)
          : undefined,
        modelInitializer: modelArtifacts.modelInitializer
          ? JSON.parse(modelArtifacts.modelInitializer)
          : undefined,
        initializerSignature: modelArtifacts.initializerSignature
          ? JSON.parse(modelArtifacts.initializerSignature)
          : undefined,
        userDefinedMetadata: modelArtifacts.userDefinedMetadata
          ? JSON.parse(modelArtifacts.userDefinedMetadata)
          : undefined,
      };
    });
  }
}

export class AiService {
  private readonly logger = logger;
  private readonly aiIoHandler: AiIoHandler;
  constructor(aiIoHandlerService?: AiIoHandlerService) {
    this.aiIoHandler = aiIoHandlerService
      ? new AiIoHandler(aiIoHandlerService)
      : undefined;
  }

  public async buildModel(
    data,
    trainingSize = 0.98,
    windowSize = 20,
    nEpochs = 10,
    learningRate = 0.01,
    nLayers = 4
  ) {
    const smaVec = data.computeSMA(windowSize);
    let inputs = smaVec.map((inp_f) => {
      return inp_f['set'].map((val) => val['value']);
    });
    let outputs = smaVec.map((outp_f) => outp_f['avg']);
    inputs = inputs.slice(0, Math.floor(trainingSize * inputs.length));
    outputs = outputs.slice(0, Math.floor(trainingSize * outputs.length));

    const result = await trainModel(
      inputs,
      outputs,
      windowSize,
      nEpochs,
      learningRate,
      nLayers
    );

    const normalize = {
      inputMax: await result.normalize.inputMax.array(),
      inputMin: await result.normalize.inputMin.array(),
      labelMax: await result.normalize.labelMax.array(),
      labelMin: await result.normalize.labelMin.array(),
    };

    result.model.setUserDefinedMetadata({
      ...(result.model.getUserDefinedMetadata() || {}),
      trainingSize,
      windowSize,
      nEpochs,
      learningRate,
      nLayers,
      normalize,
    });
    return result.model;
  }

  public async makePredictions(model, data, trainingSize = 0.98) {
    const metaData = model.getUserDefinedMetadata() as any;
    const normalize = {
      inputMax: tf.tensor(metaData.normalize.inputMax),
      inputMin: tf.tensor(metaData.normalize.inputMin),
      labelMax: tf.tensor(metaData.normalize.labelMax),
      labelMin: tf.tensor(metaData.normalize.labelMin),
    };
    const inputs = data.computeSMA(metaData.windowSize).map((inp_f) => {
      return inp_f['set'].map((val) => val['value']);
    });
    let predX = [inputs[inputs.length - 1]];
    predX = predX.slice(Math.floor(trainingSize * predX.length), predX.length);
    return makePredictions(predX, model, normalize);
  }

  public saveModel(model: tf.LayersModel, createDate: Date) {
    this.logger.debug('Saving model');
    return model.save({
      save: (m) => this.aiIoHandler.save(m, createDate),
    });
  }

  public loadModel(id: number) {
    this.logger.debug('Loading model by id: [%s]', id);
    return tf
      .loadLayersModel({
        load: () => this.aiIoHandler.loadById(id),
      })
      .catch(() => null);
  }
}

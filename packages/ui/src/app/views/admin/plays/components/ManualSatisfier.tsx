import { Canvas, CircleBrush } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdCompareArrows, MdOutlineDraw } from 'react-icons/md';

import SliderField from '../../../../components/fields/SliderField';
import { Run, useCreateRideEventMutation } from '../../../../gql';
import { dataSource } from '../../../../static';

const enum ManualSatisiferType {
  SIMPLE,
  DRAW,
}

class MouseStats {
  private prevEvent;
  private currentEvent;
  private maxSpeed = 0;
  private prevSpeed = 0;
  private maxPositiveAcc = 0;
  private maxNegativeAcc = 0;
  private movementX;
  private movementY;
  private movement;
  private speed;
  private acceleration;

  update(e) {
    this.currentEvent = e;
    if (!this.prevEvent) {
      this.prevEvent = e;
      return {
        movement: this.movement,
        movementX: this.movementX,
        movementY: this.movementY,
        speed: this.speed,
        maxSpeed: this.maxSpeed,
      };
    }
    this.movementX = Math.abs(
      this.currentEvent.screenX - this.prevEvent.screenX
    );
    this.movementY = Math.abs(
      this.currentEvent.screenY - this.prevEvent.screenY
    );
    this.movement = Math.sqrt(
      this.movementX * this.movementX + this.movementY * this.movementY
    );

    //speed=movement/100ms= movement/0.1s= 10*movement/s
    this.speed = 10 * this.movement; //current speed

    this.maxSpeed = this.speed > this.maxSpeed ? this.speed : this.maxSpeed;

    this.acceleration = 10 * (this.speed - this.prevSpeed);

    if (this.acceleration > 0) {
      this.maxPositiveAcc =
        this.acceleration > this.maxPositiveAcc
          ? this.acceleration
          : this.maxPositiveAcc;
    } else {
      this.maxNegativeAcc =
        this.acceleration < this.maxNegativeAcc
          ? this.acceleration
          : this.maxNegativeAcc;
    }

    this.prevEvent = this.currentEvent;
    this.prevSpeed = this.speed;

    return {
      movement: this.movement,
      movementX: this.movementX,
      movementY: this.movementY,
      speed: this.speed,
      maxSpeed: this.maxSpeed,
    };
  }
}

const ManualDrawSatisfier = (props: { onChange: (value) => void }) => {
  const [canvas, setCanvas] = useState<Canvas>();

  const containerRef = useRef<HTMLDivElement>();

  const updateSize = (c) => {
    c.setDimensions({
      width: containerRef.current?.offsetWidth,
      height: containerRef.current?.offsetHeight,
    });
  };

  useEffect(() => {
    if (canvas) {
      return;
    }
    const c = new Canvas('canvas', {
      backgroundColor: 'pink',
      isDrawingMode: true,
    });
    c.freeDrawingBrush = new CircleBrush(c);
    c.freeDrawingBrush.color = 'white';

    const stats = new MouseStats();
    c.on({
      'mouse:up': (event) => {
        const data = stats.update(event.e);
        const value = data.speed / data.maxSpeed;
        if (Number.isNaN(value)) {
          return;
        }
        props.onChange(value);
      },
    });

    updateSize(c);
    setCanvas(c);

    window.addEventListener('resize', () => updateSize(c));
    return () => window.removeEventListener('resize', () => updateSize(c));
  }, []);

  return (
    <div ref={containerRef as any} className="w-full h-96">
      <canvas id="canvas" className="w-full h-full block"></canvas>
    </div>
  );
};

const ManualSatisifer = (props: { activeRun: Run }) => {
  const { activeRun } = props;
  const createRideEventMutation = useCreateRideEventMutation(dataSource());

  const [type, setType] = useState(ManualSatisiferType.SIMPLE);

  const { t } = useTranslation();

  const onChange = (value) => {
    createRideEventMutation.mutate({
      event: {
        payload: { value },
      },
    });
  };

  const renderSatisfier = (type) => {
    switch (type) {
      case ManualSatisiferType.SIMPLE:
        return (
          <SliderField
            id="components.manualSatisfier.simple.intensity"
            label={t('components.manualSatisfier.simple.intensity')}
            disabled={!activeRun}
            onChange={(value) => onChange(value / 10)}
            value={0}
          />
        );
      case ManualSatisiferType.DRAW:
        return <ManualDrawSatisfier onChange={onChange} />;
    }
  };

  return (
    <>
      <div className="mt-6 w-full rounded-xl bg-lightPrimary px-3 py-3 dark:bg-navy-700">
        <h5 className="text-sm font-bold text-navy-700 dark:text-white">
          {t('components.manualSatisfier.title')}
        </h5>
        <p className="text-sm font-medium text-gray-600">
          {t('components.manualSatisfier.hint')}
        </p>
      </div>
      <div className="my-4 flex w-full gap-4">
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => setType(ManualSatisiferType.SIMPLE)}
            className={`linear flex items-center justify-center rounded-full text-2xl p-3 shadow-2xl transition hover:cursor-pointer ${
              type === ManualSatisiferType.SIMPLE
                ? 'bg-brand-500 text-white hover:!text-gray-50 active:!text-gray-100 dark:!text-navy-700 dark:bg-white dark:hover:!text-white/20 dark:active:!text-white/10'
                : 'text-brand-500 bg-white hover:!bg-gray-50 active:!bg-gray-100 dark:!bg-navy-700 dark:text-white dark:hover:!bg-white/20 dark:active:!bg-white/10'
            }`}
          >
            <MdCompareArrows />
          </button>
          <h5 className="mt-1 text-sm font-medium text-navy-700 dark:text-white">
            {t('components.manualSatisfier.simple.title')}
          </h5>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => setType(ManualSatisiferType.DRAW)}
            className={`linear flex items-center justify-center rounded-full text-2xl p-3 shadow-2xl transition hover:cursor-pointer ${
              type === ManualSatisiferType.DRAW
                ? 'bg-brand-500 text-white hover:!text-gray-50 active:!text-gray-100 dark:!text-navy-700 dark:bg-white dark:hover:!text-white/20 dark:active:!text-white/10'
                : 'text-brand-500 bg-white hover:!bg-gray-50 active:!bg-gray-100 dark:!bg-navy-700 dark:text-white dark:hover:!bg-white/20 dark:active:!bg-white/10'
            }`}
          >
            <MdOutlineDraw />
          </button>
          <h5 className="mt-1 text-sm font-medium text-navy-700 dark:text-white">
            {t('components.manualSatisfier.draw.title')}
          </h5>
        </div>
      </div>
      <div className="w-full">{renderSatisfier(type)}</div>
    </>
  );
};

export default ManualSatisifer;

import { Field, FieldOptions, ReturnTypeFunc } from '@nestjs/graphql';
import { getMetadataStorage } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/ban-types
function getValidationConstraints(
  targetConstructor: Function,
  propertyKey: string
) {
  const metadataStorage = getMetadataStorage();
  const targetMetadatas = metadataStorage.getTargetValidationMetadatas(
    targetConstructor,
    undefined,
    false,
    false,
    undefined
  );
  const groupedMetadatas = metadataStorage.groupByPropertyName(targetMetadatas);
  return groupedMetadatas[propertyKey]
    ?.filter((v) => v.name)
    .map((v) => {
      if (v.constraints && v.constraints.length > 0) {
        const c = v.constraints[0];
        return `${v.name}: (${typeof c === 'object' ? Object.values(c) : c})`;
      } else {
        return v.name;
      }
    });
}

export function DtoField(
  returnTypeFunction?: ReturnTypeFunc,
  options?: FieldOptions
): any {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: Function, propertyKey: string) {
    const constraints = getValidationConstraints(
      Object.getPrototypeOf(target).constructor,
      propertyKey
    );
    const validation = constraints
      ? `Validation: [${constraints.join(', ')}]`
      : undefined;
    const description = options?.description
      ? `${options.description}. ${validation}`
      : validation;
    const opts = options ? { ...options, description } : { description };
    if (returnTypeFunction) {
      Field(returnTypeFunction, opts)(target, propertyKey);
    } else {
      Field(opts)(target, propertyKey);
    }
  };
}

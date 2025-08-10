import { ClassConstructor, plainToInstance } from 'class-transformer';

export abstract class AbstractDto {
  [key: string]: any;

  // A helper function to transform entities into instances of the subclass DTO
  static fromEntity<T extends AbstractDto>(this: ClassConstructor<T>, entity: object): T {
    return plainToInstance(this, entity, { excludeExtraneousValues: true });
  }

  // A helper function to transform a list of entities
  static fromEntities<T extends AbstractDto>(this: ClassConstructor<T>, entities: object[]): T[] {
    return plainToInstance(this, entities, { excludeExtraneousValues: true });
  }
}

import { AggregateRoot } from '@nestjs/cqrs';

export type BusinessEssential = {
  name: string;
};

export type BusinessOptional = {
  id?: string;
  code?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type BusinessProperties = Required<BusinessEssential> &
  Partial<BusinessOptional>;
export class Business extends AggregateRoot {
  private id: string;
  private name: string;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private code: string;

  constructor(properties: BusinessProperties) {
    super();
    Object.assign(this, properties);
    this.createdAt = new Date();
  }

  properties() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      code: this.code,
    };
  }
}

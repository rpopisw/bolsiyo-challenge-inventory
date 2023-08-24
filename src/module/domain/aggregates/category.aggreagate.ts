import { AggregateRoot } from '@nestjs/cqrs';
import { Business } from './business.aggregate';

export type CategoryEssential = {
  name: string;
  business: Business;
};

export type CategoryOptional = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CategoryProperties = Required<CategoryEssential> &
  Partial<CategoryOptional>;

export class Category extends AggregateRoot {
  private id: number;
  private name: string;
  private createdAt: Date;
  private updatedAt: Date;
  private business: Business;

  constructor(properties: CategoryProperties) {
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
      business: this.business,
    };
  }
}

import { AggregateRoot } from '@nestjs/cqrs';
import { Category } from './category.aggreagate';
import { Business } from './business.aggregate';

export type ProductEssential = {
  name: string;
  priceSale: number;
  pricePurchase: number;
  category: Category;
  business: Business;
};

export type ProductOptional = {
  id?: number;
  stock?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type ProductUpdate = {
  name?: string;
  priceSale?: number;
  pricePurchase?: number;
  stock?: number;
  category?: Category;
};

export type ProductProperties = Required<ProductEssential> & ProductOptional;
export class Product extends AggregateRoot {
  private id: number;
  private name: string;
  private priceSale: number;
  private pricePurchase: number;
  private stock: number;
  private category: Category;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;
  private business: Business;

  constructor(properties: ProductProperties) {
    super();
    Object.assign(this, properties);
    this.createdAt = new Date();
    this.stock = this.stock || 0;
  }

  properties() {
    return {
      id: this.id,
      name: this.name,
      priceSale: this.priceSale,
      pricePurchase: this.pricePurchase,
      stock: this.stock,
      category: this.category,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      business: this.business,
    };
  }

  update(properties: ProductUpdate) {
    Object.assign(this, properties);
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }

  addStock(quantity: number) {
    this.stock = this.stock + quantity;
  }
}

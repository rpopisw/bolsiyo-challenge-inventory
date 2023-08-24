import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { BusinessEntity } from './business.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'name' })
  name: string;

  @Column({ type: 'int', name: 'price_sale' })
  priceSale: number;

  @Column({ type: 'int', name: 'price_purchase' })
  pricePurchase: number;

  @Column({ type: 'int', name: 'stock' })
  stock: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;

  @ManyToOne(() => BusinessEntity, (business) => business.products)
  business: BusinessEntity;
}

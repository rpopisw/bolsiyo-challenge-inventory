import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'logs_stock' })
export class LogStockEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', name: 'stock' })
  stock: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'int', name: 'product_id' })
  productId: number;
}

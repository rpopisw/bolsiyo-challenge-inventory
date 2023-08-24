export class LogsStock {
  public id?: string;
  public stock: number;
  public createdAt: Date;
  public productId: number;

  constructor(stock: number, productId: number, id?: string) {
    this.id = id;
    this.stock = stock;
    this.createdAt = new Date();
    this.productId = productId;
  }
}

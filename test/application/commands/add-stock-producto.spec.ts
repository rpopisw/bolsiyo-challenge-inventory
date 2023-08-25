import { Test, TestingModule } from '@nestjs/testing';
import {
  AddStockProductCommand,
  AddStockProductCommandHandler,
} from 'src/module/application/commands/add-stock-product.command';
import { ProductInfrastructure } from '../../../src/module/infrastructure/product.infrastructure';
import { LogsStockInfrastructure } from '../../../src/module/infrastructure/logs-stock.infrastructure';
import { Product } from '../../../src/module/domain/aggregates/product.aggregate';
import { Category } from '../../../src/module/domain/aggregates/category.aggreagate';
import { Business } from '../../../src/module/domain/aggregates/business.aggregate';
import { LogsStock } from '../../../src/module/domain/entities/logs-stock.entity';

describe('AddStockProductCommandHandler', () => {
  let handler: AddStockProductCommandHandler;
  let productRepo: ProductInfrastructure;
  let logsRepo: LogsStockInfrastructure;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddStockProductCommandHandler,
        {
          provide: ProductInfrastructure,
          useValue: {
            getById: jest.fn(),
            addStock: jest.fn(),
          },
        },
        {
          provide: LogsStockInfrastructure,
          useValue: {
            createLogStock: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<AddStockProductCommandHandler>(
      AddStockProductCommandHandler,
    );
    productRepo = module.get<ProductInfrastructure>(ProductInfrastructure);
    logsRepo = module.get<LogsStockInfrastructure>(LogsStockInfrastructure);
  });

  it('should add stock to a product and log the stock addition', async () => {
    const mockedCreateLogStock = logsRepo.createLogStock as jest.MockedFunction<
      typeof logsRepo.createLogStock
    >;

    const mockedBusiness = new Business({
      id: '1',
      name: 'test',
    });

    const mockedCategory = new Category({
      id: 1,
      name: 'test',
      business: mockedBusiness,
    });

    const mockedProduct = new Product({
      id: 1,
      name: 'test',
      priceSale: 10,
      pricePurchase: 5,
      stock: 0,
      category: mockedCategory,
      business: mockedBusiness,
    });
    mockedProduct.addStock = jest.fn();

    (productRepo.getById as jest.Mock).mockResolvedValueOnce(mockedProduct);

    const command = new AddStockProductCommand(1, 10);
    await handler.execute(command);

    expect(productRepo.getById).toHaveBeenCalledWith(1);
    expect(mockedProduct.addStock).toHaveBeenCalledWith(10);
    expect(productRepo.addStock).toHaveBeenCalledWith(1, 10);
    const receivedLogStock = mockedCreateLogStock.mock.calls[0][0];
    const expectedLogStock = new LogsStock(10, 1);
    delete receivedLogStock.createdAt;
    delete expectedLogStock.createdAt;
    expect(receivedLogStock).toEqual(expectedLogStock);



  });
});

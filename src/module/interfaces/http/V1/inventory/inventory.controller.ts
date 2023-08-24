import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCategoryRequestDto } from './dtos/create-category-request.dto';
import { CreateCategoryCommand } from '../../../../application/commands/create-category.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BusinessCodeRequestDto } from './dtos/business-code-request.dto';
import { DeleteCategoryRequestDto } from './dtos/delete-category.request.dto';
import { DeleteCategoryCommand } from '../../../../application/commands/delete-category.command';
import { ListCategoryQuery } from '../../../../application/queries/list-category.query';

@ApiTags('Inventory API')
@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly logger: Logger,
    private readonly command: CommandBus,
    private readonly query: QueryBus,
  ) {}

  @Post('/business/:businessCode/category')
  @ApiOperation({ summary: 'Create a new category' })
  @ApiHeaders([{ name: 'authorization', description: 'JWT Bearer' }])
  async createCategory(
    @Body() createCategoryDto: CreateCategoryRequestDto,
    @Param() params: BusinessCodeRequestDto,
  ): Promise<Record<string, any>> {
    this.logger.log(`Create Category controller`);
    const { name } = createCategoryDto;
    const { businessCode } = params;
    const command = new CreateCategoryCommand(name, businessCode);
    return await this.command.execute(command);
  }

  @Post('/business/:businessCode/category/delete')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiHeaders([{ name: 'authorization', description: 'JWT Bearer' }])
  async deleteCategory(@Body() deleteCategoryDto: DeleteCategoryRequestDto) {
    this.logger.log(`Delete Category controller`);
    const { categoryId, businessId } = deleteCategoryDto;
    const command = new DeleteCategoryCommand(categoryId, businessId);
    return await this.command.execute(command);
  }

  @Get('/business/:businessCode/category')
  @ApiOperation({ summary: 'List all categories by business code' })
  @ApiHeaders([{ name: 'authorization', description: 'JWT Bearer' }])
  async listCategoriesByBusinessCode(
    @Param() params: BusinessCodeRequestDto,
  ): Promise<Record<string, any>> {
    this.logger.log(`List Categories by Business Code controller`);
    const { businessCode } = params;
    const query = new ListCategoryQuery(businessCode);
    return await this.query.execute(query);
  }
}

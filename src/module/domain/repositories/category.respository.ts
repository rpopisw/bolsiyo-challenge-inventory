import { Category } from '../aggregates/category.aggreagate';

export interface CategoryRepository {
  createCategory(category: Category): Promise<Category>;
  deleteCategory(categoryId: number, businessId: string): Promise<void>;
  listCategoriesByBusinessCode(businessCode: string): Promise<Category[]>;
  getCategoryById(categoryId: number): Promise<Category>;
}

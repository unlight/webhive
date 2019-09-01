import { CategoryRepository } from './category.repository';
import { inject } from 'njct';

/**
 * Service to work with categories.
 */
export class CategoryService {

    constructor(
        private readonly categoryRepository = inject.service(CategoryRepository),
    ) { }

    async findOrCreate(name: string) {
        return this.categoryRepository.findOrCreate(name);
    }
}

import { CategoryRepository } from './category.repository';
import { inject } from 'njct';

/**
 * Service to work with categories.
 */
export class CategoryService {

    constructor(
        private readonly categoryRepository = inject(CategoryRepository),
    ) { }

    async findOrCreate(name: string) {
        return this.categoryRepository.findOrCreate(name);
    }

    async browse({ count = 100 }) {
        return this.categoryRepository.browse({ count });
    }
}

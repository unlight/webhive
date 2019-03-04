import { CategoryRepository } from './category.repository';
import { inject } from 'njct';

export class CategoryService {

    constructor(
        private readonly categoryRepository = inject(CategoryRepository),
    ) { }

    async findOrCreate(name: string) {
        return await this.categoryRepository.findOrCreate(name);
    }
}

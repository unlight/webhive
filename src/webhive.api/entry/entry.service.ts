import { inject } from 'njct';
import { EntryRepository } from './entry.repository';
import { CreateEntryDTO } from './entry.dto';
import { EntryModel } from './entry.model';
import { CategoryRepository } from '../category/category.repository';

export class EntryService {

    constructor(
        private readonly entryRepository = inject(EntryRepository),
        private readonly categoryRepository = inject(CategoryRepository),
    ) { }

    async create(data: CreateEntryDTO) {
        const entry: EntryModel = {
            title: data.title,
            link: data.link,
            date: new Date(data.date),
        };
        const categoryName = data.category;
        if (categoryName) {
            // Get existing category or create new
            const category = await this.categoryRepository.findOrCreate(categoryName);
            entry.category_id = category._id;
        }
        return await this.entryRepository.insert(entry);
    }
}

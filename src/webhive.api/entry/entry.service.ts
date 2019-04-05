import { inject } from 'njct';
import { EntryRepository } from './entry.repository';
import { CreateEntryDTO } from './entry.dto';
import { EntryModel } from './entry.model';
import { CategoryRepository } from '../category/category.repository';

export type EntryBrowseRequest = {
    skip: number;
    limit: number;
    q: string;
}

/**
 * Entry service, any logic should be here.
 */
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
        return this.entryRepository.insert(entry);
    }

    async getByLink(link: string) {
        return this.entryRepository.getByLink(link);
    }

    async browse(entryBrowseRequest: Partial<EntryBrowseRequest> = {}) {
        let { skip = 0, limit = 100, q } = entryBrowseRequest; // tslint:disable-line:prefer-const
        if (limit > 100 || limit <= 0) {
            limit = 100;
        }
        if (skip <= 0) {
            skip = 0;
        }
        let filter: any;
        if (q) {
            filter = { title: new RegExp(q, 'i') };
            const categoryMatch = { 'category.name': new RegExp(q, 'i') };
            filter = { $or: [filter, categoryMatch] };
        }
        const sort = { date: -1 };
        return this.entryRepository.find({ skip, limit, sort, filter });
    }
}

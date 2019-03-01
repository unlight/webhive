import { ObjectId } from '../store/mongo';

export type EntryModel = {
    title: string;
    link: string;
    date: Date;
    category_id?: ObjectId;
};

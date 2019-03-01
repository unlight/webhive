import { ObjectId } from '../store/mongo';

export type CategoryModel = {
    _id?: ObjectId;
    name: string;
};

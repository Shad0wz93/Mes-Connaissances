import { LevelType } from './Knowledge';

export interface FormData {
    name: string;
    description: string;
    level: LevelType;
    acquisition_date: string;
    category_id: string | number;
}
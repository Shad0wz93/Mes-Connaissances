export type LevelType = 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';

export interface Knowledge {
    id: string | number;
    name: string;
    description?: string;
    level: LevelType;
    category_name?: string;
    acquisition_date?: string;
    category_id: string | number;
}
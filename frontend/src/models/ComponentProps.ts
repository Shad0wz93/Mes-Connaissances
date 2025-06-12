import { Knowledge } from './Knowledge';
import { Category } from './Category';

// Props pour CategoryForm
export interface CategoryFormProps {
    onClose: () => void;
    onSave: () => void;
    apiBase: string;
}

// Props pour KnowledgeCard
export interface KnowledgeCardProps {
    knowledge: Knowledge;
    onEdit: (knowledge: Knowledge) => void;
    onDelete: (knowledge: Knowledge) => void;
}

// Props pour KnowledgeForm
export interface KnowledgeFormProps {
    knowledge?: Knowledge | null;
    categories: Category[];
    onClose: () => void;
    onSave: () => void;
    apiBase: string;
}

// Props pour DeleteConfirmModal
export interface DeleteConfirmModalProps {
    knowledge: Knowledge;
    onConfirm: () => void;
    onCancel: () => void;
}

// Props pour EmptyState
export interface EmptyStateProps {
    onAddKnowledge: () => void;
}
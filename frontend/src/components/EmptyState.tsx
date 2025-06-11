import React from 'react';
import { BookOpen, Plus } from 'lucide-react';
import { EmptyStateProps } from '../models/ComponentProps';

const EmptyState: React.FC<EmptyStateProps> = ({ onAddKnowledge }) => {
    return (
        <div className="text-center py-12 text-gray-500">
            <BookOpen size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
                Aucune connaissance trouvée
            </h3>
            <p className="mb-6">
                Commencez par ajouter votre première connaissance.
            </p>
            <button
                onClick={onAddKnowledge}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 mx-auto"
            >
                <Plus size={16} />
                Ajouter une connaissance
            </button>
        </div>
    );
};

export default EmptyState;
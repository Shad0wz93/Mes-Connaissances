import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Knowledge } from '../../models/Knowledge';
import { KnowledgeCardProps } from '../../models/ComponentProps';

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ knowledge, onEdit, onDelete }) => {
    const getLevelBadgeStyle = (level: Knowledge['level']): string => {
        switch (level) {
            case 'Débutant':
                return 'bg-red-100 text-red-800';
            case 'Intermédiaire':
                return 'bg-yellow-100 text-yellow-800';
            case 'Avancé':
                return 'bg-blue-100 text-blue-800';
            case 'Expert':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString?: string): string => {
        if (!dateString) return 'Non spécifiée';
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                    {knowledge.name}
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(knowledge)}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                    >
                        <Edit2 size={16} className="text-gray-500 hover:text-blue-600" />
                    </button>
                    <button
                        onClick={() => onDelete(knowledge)}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                    >
                        <Trash2 size={16} className="text-gray-500 hover:text-red-600" />
                    </button>
                </div>
            </div>

            {knowledge.description && (
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {knowledge.description}
                </p>
            )}

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Niveau:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeStyle(knowledge.level)}`}>
                        {knowledge.level}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Catégorie:</span>
                    <span className="text-sm font-medium text-gray-900">
                        {knowledge.category_name || 'Non classée'}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Date d'acquisition:</span>
                    <span className="text-sm font-medium text-gray-900">
                        {formatDate(knowledge.acquisition_date)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default KnowledgeCard;
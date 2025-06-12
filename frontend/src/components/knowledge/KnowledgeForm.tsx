import React, { useState } from 'react';
import { X } from 'lucide-react';
import {LevelType } from '../../models/Knowledge';
import { FormData } from '../../models/FormData';
import { KnowledgeFormProps } from '../../models/ComponentProps';
import { ApiResponse } from '../../models/ApiResponse';

const KnowledgeForm: React.FC<KnowledgeFormProps> = ({ knowledge, categories, onClose, onSave, apiBase }) => {
    const [formData, setFormData] = useState<FormData>({
        name: knowledge?.name || '',
        description: knowledge?.description || '',
        level: knowledge?.level || 'Débutant',
        acquisition_date: knowledge?.acquisition_date ? knowledge.acquisition_date.split('T')[0] : '',
        category_id: knowledge?.category_id || ''
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (): Promise<void> => {
        if (!formData.name.trim() || !formData.category_id) {
            alert('Le nom et la catégorie sont requis');
            return;
        }

        setLoading(true);

        try {
            const url = knowledge
                ? `${apiBase}/api/knowledges/${knowledge.id}`
                : `${apiBase}/api/knowledges`;

            const method = knowledge ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data: ApiResponse = await response.json();
            if (data.success) {
                onSave();
            } else {
                alert('Erreur: ' + data.message);
            }
        } catch (error) {
            alert('Erreur lors de la sauvegarde');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof FormData, value: string | number): void => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-110 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                        {knowledge ? 'Modifier la connaissance' : 'Nouvelle connaissance'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nom *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ex: React, Git, PostgreSQL"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-y min-h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Description optionnelle..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Niveau *
                        </label>
                        <select
                            required
                            value={formData.level}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('level', e.target.value as LevelType)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="Débutant">Débutant</option>
                            <option value="Intermédiaire">Intermédiaire</option>
                            <option value="Avancé">Avancé</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Catégorie *
                        </label>
                        <select
                            required
                            value={formData.category_id}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('category_id', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Sélectionner une catégorie</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date d'acquisition
                        </label>
                        <input
                            type="date"
                            value={formData.acquisition_date}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('acquisition_date', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Sauvegarde...' : (knowledge ? 'Modifier' : 'Créer')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KnowledgeForm;
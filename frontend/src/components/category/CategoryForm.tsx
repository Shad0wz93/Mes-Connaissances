import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CategoryFormProps } from '../../models/ComponentProps';
import { ApiResponse } from '../../models/ApiResponse';

const CategoryForm: React.FC<CategoryFormProps> = ({ onClose, onSave, apiBase }) => {
    const [name, setName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (): Promise<void> => {
        if (!name.trim()) {
            alert('Le nom de la catégorie est requis');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${apiBase}/api/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name.trim() })
            });

            const data: ApiResponse = await response.json();
            if (data.success) {
                onSave();
            } else {
                alert('Erreur: ' + data.message);
            }
        } catch (error) {
            alert('Erreur lors de la création de la catégorie');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Nouvelle catégorie</h2>
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
                            Nom de la catégorie *
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ex: Frontend, Backend, DevOps..."
                            autoFocus
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
                            disabled={loading || !name.trim()}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Création...' : 'Créer'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;
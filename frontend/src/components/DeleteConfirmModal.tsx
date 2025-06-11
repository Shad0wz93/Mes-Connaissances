import React from 'react';
import { Trash2 } from 'lucide-react';
import { DeleteConfirmModalProps } from '../models/ComponentProps';

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ knowledge, onConfirm, onCancel }) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        if (e.key === 'Enter') {
            onConfirm();
        } else if (e.key === 'Escape') {
            onCancel();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onKeyDown={handleKeyPress}
            tabIndex={0}
        >
            <div className="bg-white rounded-xl max-w-md w-full p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <Trash2 size={24} className="text-red-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Confirmer la suppression
                        </h2>
                        <p className="text-sm text-gray-600">
                            Cette action est irréversible
                        </p>
                    </div>
                </div>

                <p className="text-gray-700 mb-6">
                    Êtes-vous sûr de vouloir supprimer la connaissance{' '}
                    <strong>"{knowledge.name}"</strong> ?
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        autoFocus
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
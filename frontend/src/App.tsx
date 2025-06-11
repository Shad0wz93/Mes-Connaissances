import React, { useState, useEffect } from 'react';
import { Plus, Filter, BookOpen, Tag } from 'lucide-react';
import KnowledgeCard from './components/knowledge/KnowledgeCard.tsx';
import KnowledgeForm from './components/knowledge/KnowledgeForm.tsx';
import CategoryForm from './components/category/CategoryForm.tsx';
import DeleteConfirmModal from './components/DeleteConfirmModal.tsx';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import EmptyState from './components/EmptyState.tsx';
import { Knowledge } from './models/Knowledge';
import { Category } from './models/Category';
import { ApiResponse } from './models/ApiResponse';

const tailwindStyle = document.createElement('link');
tailwindStyle.rel = 'stylesheet';
tailwindStyle.href = 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css';
if (!document.head.querySelector('link[href*="tailwind"]')) {
    document.head.appendChild(tailwindStyle);
}

const App: React.FC = () => {
    const [knowledges, setKnowledges] = useState<Knowledge[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [showKnowledgeForm, setShowKnowledgeForm] = useState<boolean>(false);
    const [showCategoryForm, setShowCategoryForm] = useState<boolean>(false);
    const [editingKnowledge, setEditingKnowledge] = useState<Knowledge | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<Knowledge | null>(null);

    const API_BASE: string = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

    useEffect(() => {
        loadCategories();
        loadKnowledges();
    }, []);

    const loadCategories = async (): Promise<void> => {
        try {
            const response = await fetch(`${API_BASE}/api/categories`);
            const data: ApiResponse & { data?: Category[] } = await response.json();
            if (data.success && data.data) {
                setCategories(data.data);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des catégories:', error);
        }
    };

    const loadKnowledges = async (categoryId: string = ''): Promise<void> => {
        try {
            setLoading(true);
            const url = categoryId
                ? `${API_BASE}/api/knowledges?category_id=${categoryId}`
                : `${API_BASE}/api/knowledges`;

            const response = await fetch(url);
            const data: ApiResponse & { data?: Knowledge[] } = await response.json();
            if (data.success && data.data) {
                setKnowledges(data.data);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des connaissances:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteKnowledge = async (id: string | number): Promise<void> => {
        try {
            const response = await fetch(`${API_BASE}/api/knowledges/${id}`, {
                method: 'DELETE'
            });

            const data: ApiResponse = await response.json();
            if (data.success) {
                loadKnowledges(selectedCategory);
                setShowDeleteConfirm(null);
            } else {
                alert('Erreur lors de la suppression: ' + data.message);
            }
        } catch (error) {
            alert('Erreur lors de la suppression');
            console.error(error);
        }
    };

    const handleCategoryFilter = (categoryId: string): void => {
        setSelectedCategory(categoryId);
        loadKnowledges(categoryId);
    };

    const handleEditKnowledge = (knowledge: Knowledge): void => {
        setEditingKnowledge(knowledge);
        setShowKnowledgeForm(true);
    };

    const handleKnowledgeFormClose = (): void => {
        setShowKnowledgeForm(false);
        setEditingKnowledge(null);
    };

    const handleKnowledgeFormSave = (): void => {
        loadKnowledges(selectedCategory);
        setShowKnowledgeForm(false);
        setEditingKnowledge(null);
    };

    const handleCategoryFormClose = (): void => {
        setShowCategoryForm(false);
    };

    const handleCategoryFormSave = (): void => {
        loadCategories();
        setShowCategoryForm(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">
                    <div className="flex items-center gap-3">
                        <BookOpen size={32} className="text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-900">Mes Connaissances</h1>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowCategoryForm(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <Tag size={16} />
                            Nouvelle Catégorie
                        </button>
                        <button
                            onClick={() => setShowKnowledgeForm(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <Plus size={16} />
                            Nouvelle Connaissance
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Filtres */}
                <div className="flex items-center gap-4 mb-6">
                    <Filter size={20} className="text-gray-500" />
                    <select
                        value={selectedCategory}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCategoryFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white min-w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Toutes les catégories</option>
                        {categories.map((category: Category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Contenu principal */}
                {loading ? (
                    <LoadingSpinner />
                ) : knowledges.length === 0 ? (
                    <EmptyState onAddKnowledge={() => setShowKnowledgeForm(true)} />
                ) : (
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {knowledges.map((knowledge: Knowledge) => (
                            <KnowledgeCard
                                key={knowledge.id}
                                knowledge={knowledge}
                                onEdit={handleEditKnowledge}
                                onDelete={setShowDeleteConfirm}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Modals */}
            {showDeleteConfirm && (
                <DeleteConfirmModal
                    knowledge={showDeleteConfirm}
                    onConfirm={() => handleDeleteKnowledge(showDeleteConfirm.id)}
                    onCancel={() => setShowDeleteConfirm(null)}
                />
            )}

            {showKnowledgeForm && (
                <KnowledgeForm
                    knowledge={editingKnowledge}
                    categories={categories}
                    onClose={handleKnowledgeFormClose}
                    onSave={handleKnowledgeFormSave}
                    apiBase={API_BASE}
                />
            )}

            {showCategoryForm && (
                <CategoryForm
                    onClose={handleCategoryFormClose}
                    onSave={handleCategoryFormSave}
                    apiBase={API_BASE}
                />
            )}
        </div>
    );
};

export default App;
<?php
require_once __DIR__ . '/../models/Category.php';

class CategoryController {
    private $category;

    public function __construct() {
        $this->category = new Category();
    }

    public function handleRequest($method, $id = null) {
        switch ($method) {
            case 'GET':
                $this->getCategories();
                break;

            case 'POST':
                $this->createCategory();
                break;

            case 'PUT':
                if (!$id) {
                    http_response_code(400);
                    echo json_encode(['success' => false, 'message' => 'ID requis pour la mise à jour']);
                    return;
                }
                $this->updateCategory($id);
                break;

            case 'DELETE':
                if (!$id) {
                    http_response_code(400);
                    echo json_encode(['success' => false, 'message' => 'ID requis pour la suppression']);
                    return;
                }
                $this->deleteCategory($id);
                break;

            default:
                http_response_code(405);
                echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
        }
    }

    private function getCategories() {
        try {
            $categories = $this->category->getAll();
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'data' => $categories
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Erreur lors de la récupération des catégories: ' . $e->getMessage()
            ]);
        }
    }

    private function createCategory() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['name']) || trim($data['name']) === '') {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Le nom de la catégorie est requis']);
            return;
        }

        try {
            $id = $this->category->create(trim($data['name']));
            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Catégorie créée avec succès',
                'id' => $id
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Erreur lors de la création de la catégorie: ' . $e->getMessage()
            ]);
        }
    }

    private function updateCategory($id) {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['name']) || trim($data['name']) === '') {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Le nom de la catégorie est requis']);
            return;
        }

        try {
            $existing = $this->category->getById($id);
            if (!$existing) {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Catégorie non trouvée']);
                return;
            }

            $success = $this->category->update($id, trim($data['name']));

            if ($success) {
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Catégorie mise à jour avec succès'
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'message' => 'Erreur lors de la mise à jour'
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour de la catégorie: ' . $e->getMessage()
            ]);
        }
    }

    private function deleteCategory($id) {
        try {
            $existing = $this->category->getById($id);
            if (!$existing) {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Catégorie non trouvée']);
                return;
            }

            $success = $this->category->delete($id);

            if ($success) {
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Catégorie supprimée avec succès'
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'message' => 'Erreur lors de la suppression'
                ]);
            }
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
?>
<?php
require_once __DIR__ . '/../models/Knowledge.php';

class KnowledgeController {
    private $knowledge;

    public function __construct() {
        $this->knowledge = new Knowledge();
    }

    public function handleRequest($method, $id = null) {
        switch ($method) {
            case 'GET':
                $this->getKnowledges();
                break;

            case 'POST':
                $this->createKnowledge();
                break;

            case 'PUT':
                if (!$id) {
                    http_response_code(400);
                    echo json_encode(['success' => false, 'message' => 'ID requis pour la mise à jour']);
                    return;
                }
                $this->updateKnowledge($id);
                break;

            case 'DELETE':
                if (!$id) {
                    http_response_code(400);
                    echo json_encode(['success' => false, 'message' => 'ID requis pour la suppression']);
                    return;
                }
                $this->deleteKnowledge($id);
                break;

            default:
                http_response_code(405);
                echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
        }
    }

    private function getKnowledges() {
        try {
            $category_id = isset($_GET['category_id']) ? $_GET['category_id'] : null;
            $knowledges = $this->knowledge->getAll($category_id);

            http_response_code(200);
            echo json_encode([
                'success' => true,
                'data' => $knowledges
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Erreur lors de la récupération des connaissances: ' . $e->getMessage()
            ]);
        }
    }

    private function createKnowledge() {
        $data = json_decode(file_get_contents("php://input"), true);

        // Validation des données
        $required_fields = ['name', 'level', 'category_id'];
        foreach ($required_fields as $field) {
            if (!isset($data[$field]) || trim($data[$field]) === '') {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => "Le champ $field est requis"]);
                return;
            }
        }

        $valid_levels = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];
        if (!in_array($data['level'], $valid_levels)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Niveau invalide']);
            return;
        }

        try {
            $acquisition_date = isset($data['acquisition_date']) && $data['acquisition_date'] !== ''
                ? $data['acquisition_date']
                : null;

            $description = isset($data['description']) ? trim($data['description']) : null;

            $id = $this->knowledge->create(
                trim($data['name']),
                $description,
                $data['level'],
                $acquisition_date,
                $data['category_id']
            );

            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Connaissance créée avec succès',
                'id' => $id
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Erreur lors de la création de la connaissance: ' . $e->getMessage()
            ]);
        }
    }

    private function updateKnowledge($id) {
        $data = json_decode(file_get_contents("php://input"), true);

        $required_fields = ['name', 'level', 'category_id'];
        foreach ($required_fields as $field) {
            if (!isset($data[$field]) || trim($data[$field]) === '') {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => "Le champ $field est requis"]);
                return;
            }
        }

        $valid_levels = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];
        if (!in_array($data['level'], $valid_levels)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Niveau invalide']);
            return;
        }

        try {
            $existing = $this->knowledge->getById($id);
            if (!$existing) {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Connaissance non trouvée']);
                return;
            }

            $acquisition_date = isset($data['acquisition_date']) && $data['acquisition_date'] !== ''
                ? $data['acquisition_date']
                : null;

            $description = isset($data['description']) ? trim($data['description']) : null;

            $success = $this->knowledge->update(
                $id,
                trim($data['name']),
                $description,
                $data['level'],
                $acquisition_date,
                $data['category_id']
            );

            if ($success) {
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Connaissance mise à jour avec succès'
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
                'message' => 'Erreur lors de la mise à jour de la connaissance: ' . $e->getMessage()
            ]);
        }
    }

    private function deleteKnowledge($id) {
        try {
            $existing = $this->knowledge->getById($id);
            if (!$existing) {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Connaissance non trouvée']);
                return;
            }

            $success = $this->knowledge->delete($id);

            if ($success) {
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Connaissance supprimée avec succès'
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'message' => 'Erreur lors de la suppression'
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Erreur lors de la suppression de la connaissance: ' . $e->getMessage()
            ]);
        }
    }
}
?>
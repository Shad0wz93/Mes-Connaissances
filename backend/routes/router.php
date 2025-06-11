<?php
require_once __DIR__ . '/../controllers/CategoryController.php';
require_once __DIR__ . '/../controllers/KnowledgeController.php';

class Router {
    private $categoryController;
    private $knowledgeController;

    public function __construct() {
        $this->categoryController = new CategoryController();
        $this->knowledgeController = new KnowledgeController();
    }

    public function handleRequest() {
        $request_method = $_SERVER['REQUEST_METHOD'];
        $request_uri = $_SERVER['REQUEST_URI'];

        $path = parse_url($request_uri, PHP_URL_PATH);
        $path = str_replace('/index.php', '', $path);
        $path = trim($path, '/');

        $segments = explode('/', $path);

        if (empty($path) || $path === 'api') {
            $this->showApiInfo();
            return;
        }

        try {
            $resource = '';
            $id = null;

            if (count($segments) >= 2 && $segments[0] === 'api') {
                $resource = $segments[1];
                if (count($segments) >= 3) {
                    $id = $segments[2];
                }
            }

            switch ($resource) {
                case 'categories':
                    $this->categoryController->handleRequest($request_method, $id);
                    break;

                case 'knowledges':
                    $this->knowledgeController->handleRequest($request_method, $id);
                    break;

                default:
                    http_response_code(404);
                    echo json_encode(['success' => false, 'message' => 'Endpoint non trouvé']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Erreur serveur: ' . $e->getMessage()
            ]);
        }
    }

    private function showApiInfo() {
        echo json_encode([
            'success' => true,
            'message' => 'API Mes Connaissances',
            'version' => '1.0',
            'endpoints' => [
                'GET /api/categories' => 'Récupérer toutes les catégories',
                'POST /api/categories' => 'Créer une nouvelle catégorie',
                'PUT /api/categories/{id}' => 'Mettre à jour une catégorie',
                'DELETE /api/categories/{id}' => 'Supprimer une catégorie',
                'GET /api/knowledges' => 'Récupérer toutes les connaissances',
                'GET /api/knowledges?category_id=X' => 'Récupérer les connaissances par catégorie',
                'POST /api/knowledges' => 'Créer une nouvelle connaissance',
                'PUT /api/knowledges/{id}' => 'Mettre à jour une connaissance',
                'DELETE /api/knowledges/{id}' => 'Supprimer une connaissance'
            ]
        ]);
    }
}
?>
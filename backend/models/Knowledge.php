<?php
require_once __DIR__ . '/../config/database.php';

class Knowledge {
    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function getAll($category_id = null) {
        $query = "SELECT k.*, c.name as category_name 
                  FROM knowledges k 
                  LEFT JOIN categories c ON k.category_id = c.id";
        $params = [];

        if ($category_id) {
            $query .= " WHERE k.category_id = :category_id";
            $params['category_id'] = $category_id;
        }

        $query .= " ORDER BY k.created_at DESC";

        $stmt = $this->conn->prepare($query);

        foreach ($params as $key => $value) {
            $stmt->bindParam(':' . $key, $value);
        }

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $query = "SELECT k.*, c.name as category_name 
                  FROM knowledges k 
                  LEFT JOIN categories c ON k.category_id = c.id 
                  WHERE k.id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($name, $description, $level, $acquisition_date, $category_id) {
        $query = "INSERT INTO knowledges (name, description, level, acquisition_date, category_id, created_at) 
                  VALUES (:name, :description, :level, :acquisition_date, :category_id, NOW()) RETURNING id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':level', $level);
        $stmt->bindParam(':acquisition_date', $acquisition_date);
        $stmt->bindParam(':category_id', $category_id);

        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC)['id'];
    }

    public function update($id, $name, $description, $level, $acquisition_date, $category_id) {
        $query = "UPDATE knowledges 
                  SET name = :name, description = :description, level = :level, 
                      acquisition_date = :acquisition_date, category_id = :category_id 
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':level', $level);
        $stmt->bindParam(':acquisition_date', $acquisition_date);
        $stmt->bindParam(':category_id', $category_id);

        return $stmt->execute();
    }

    public function delete($id) {
        $query = "DELETE FROM knowledges WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
?>
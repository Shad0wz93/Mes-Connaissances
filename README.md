# Mes Connaissances

Application web pour recenser mes connaissances personnelles, les classer par catégorie et leur attribuer un niveau d'évaluation.

## 📋 Stack Technique

### Frontend
- React
- Tailwind CSS
- TypeScript

### Backend
- PHP Natif
- Base de données : MySQL, MariaDB ou PostgreSQL

## 🚀 Installation et Lancement

### Prérequis
- Node.js et npm installés
- PHP 7.4+ installé
- MySQL/MariaDB ou PostgreSQL installé

### 1. Clonage du projet
```bash
git clone [URL_DU_REPO]
cd nom du dossier
```

### 2. Configuration de la base de données

#### Création de la base de données
Créez une nouvelle base de données dans votre SGBD (MySQL, MariaDB ou PostgreSQL).

#### Import du schéma
Importez le fichier `backend/database/schema.sql` dans votre base de données :
```bash
# Pour MySQL/MariaDB
mysql -u [username] -p [database_name] < backend/database/schema.sql

# Pour PostgreSQL
psql -U [username] -d [database_name] -f backend/database/schema.sql
```

### 3. Configuration du Backend

#### Variables d'environnement
1. Copiez le fichier d'exemple :
```bash
cd backend
cp .env-exemple .env
```

2. Modifiez le fichier `.env` avec vos paramètres de base de données :
```env
# Configuration env back
DB_HOST=localhost
DB_NAME=mes_connaissances
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_PORT=3306

# Configuration env front
REACT_APP_API_BASE_URL= url back
```

#### Lancement du serveur backend
```bash
cd backend
php -S localhost:8000
```

Le serveur backend sera accessible sur `http://localhost:8000`

### 4. Configuration du Frontend

#### Installation des dépendances
```bash
cd frontend
npm install
```

#### Variables d'environnement
1. Copiez le fichier d'exemple :
```bash
cp .env-exemple .env
```

2. Modifiez le fichier `.env` :
```env
# URL de l'API backend
REACT_APP_API_URL=http://localhost:8000

# Configuration développement
REACT_APP_ENV=development
```

#### Lancement de l'application frontend
```bash
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 📁 Structure du Projet

```
Mes-Connaissances/
├── backend/
│   ├── config/
│   │   └── database.php
│   ├── controllers/
│   │   ├── CategoryController.php
│   │   └── KnowledgeController.php
│   ├── database/
│   │   └── schema.sql
│   ├── models/
│   │   ├── Category.php
│   │   └── Knowledge.php
│   ├── routes/
│   │   └── router.php
│   ├── .env
│   ├── .env-exemple
│   ├── .gitignore
│   └── index.php
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── category/
│   │   │   │   └── CategoryForm.tsx
│   │   │   ├── knowledge/
│   │   │   │   ├── KnowledgeCard.tsx
│   │   │   │   └── KnowledgeForm.tsx
│   │   │   ├── DeleteConfirmModal.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── models/
│   │   │   ├── ApiResponse.ts
│   │   │   ├── Category.ts
│   │   │   ├── ComponentProps.ts
│   │   │   ├── FormData.ts
│   │   │   └── Knowledge.ts
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── index.tsx
│   │   └── logo.svg
│   ├── .env
│   ├── .env-exemple
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
├── screenshots/
├── .gitignore
└── README.md

```
## Captures d'écran

### Interface principale

![Interface principale](screenshots/interface-principale-2025-06-12-14-04-55.png)

### Ajouter une connaissance

![Ajouter une connaissance](screenshots/ajouter-connaissance-2025-06-12-14-05-45.png)

### Ajouter une catégorie

![Ajouter une catégorie](screenshots/ajouter-categorie-2025-06-12-14-07-44.png)

## 🎯 Fonctionnalités

### Gestion des Connaissances
- ✅ Ajouter une nouvelle connaissance
- ✅ Modifier ou supprimer une connaissance
- ✅ Consulter la liste complète
- ✅ Filtrage possible par catégorie

### Gestion des Catégories
- ✅ Créer de nouvelles catégories
- ✅ Supprimer ou renommer des catégories
- ✅ Filtrer les connaissances par catégorie

## 🛠️ Développement

### Commandes utiles

#### Frontend
```bash
# Démarrage en mode développement
npm start
```

#### Backend
```bash
# Démarrage du serveur de développement
php -S localhost:8000

```

## 📝 Notes importantes

- Assurez-vous que les ports 3000 (frontend) et 8000 (backend) sont libres
- Les fichiers `.env` ne doivent pas être versionnés (ajoutés au .gitignore)

## 🐛 Dépannage

### Problèmes courants

1. **Erreur de connexion à la base de données**
    - Vérifiez les paramètres dans le fichier `.env` du backend
    - Assurez-vous que le service de base de données est démarré

2. **Port déjà utilisé**
    - Frontend : changez le port avec `PORT=3001 npm start`
    - Backend : utilisez `php -S localhost:8001` et mettez à jour `REACT_APP_API_URL`
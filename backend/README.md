## Groupomania - Projet 7

BACKEND

## Technologies utilisées

-JavaScript,
-node,
-Express,
-JWT,
-bcrypt,
-dotenv
-Multer,
-MySQL avec PlanetScale et Prisma (Version Cloud),

Un fichier .en_exemple existe pour stocker les variables environnements utilisées pour gérer le backend.

## Démarrer l'utilisation du projet

1. Copier le code du repository / Cloner le repository
2. npm install
3. Enregirstrer vos variables d'environnement dans un fichier .env
4. Faire npm run start avec le terminal dans le fichier backend.
5. Faire npm run start avec le terminal dans le fichier frontend.

## Utiliser Prisma / Planet Scale pour votre base de données

Les modèles de la base de données sont dans le fichier prisma.schema.
Une fois votre compte créer sur PlanetScale :

- npx prisma db push => `Pour modifier tous les changements effectués dans la base de données.` (Par exemple, si vous avez créer de nouveaux modèles.)
  `Important, si vous démarrer from scratch, bien s'assurer qu'il y'a :
- @prisma/client & prisma dans les dépendances,
- Un modèle défini dans le schema.prisma,
- Si vous avez créer une nouvelle base de données dans Prisma, utiliser "npx prisma generate" pour la créer avant de faire "npx prisma db push" pour pusher la base de données Prisma vers Planet Scale.`

Il faut faire npx prisma db push à chaque changements des modèles. 
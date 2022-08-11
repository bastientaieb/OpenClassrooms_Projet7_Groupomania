Groupomania - Projet 7

Contexte : L'entreprise Groupomania cherche à améliorer la motivation et la communication interne. Pour cela, ils ont demandé à créer un réseau social d'entreprise qui va permettre de : 
- Publier du contenu (Image et texte),
- Modifier son post,
- Commenter les posts,
- Aimer un post (1 like possible par post),
- Supprimer son post, 
- S'inscrire et se connecter, 
- Le site doit avoir un compte administrateur pour tout gérer. 

Le réseau social est créé from scratch avec les technologies suivantes : 
-JavaScript, -node, -Express, -JWT, -bcrypt, -dotenv -Multer, -MySQL avec PlanetScale et Prisma (Version Cloud).

UTILISATION DU SITE GROUPOMANIA : 

Un fichier .en_exemple existe pour stocker les variables environnements utilisées pour gérer le backend.

Démarrer l'utilisation du projet
Copier le code du repository / Cloner le repository
npm install
Enregirstrer vos variables d'environnement dans un fichier .env
Faire npm run start avec le terminal dans le fichier backend.
Faire npm run start avec le terminal dans le fichier frontend.
Utiliser Prisma / Planet Scale pour votre base de données
Les modèles de la base de données sont dans le fichier prisma.schema. Une fois votre compte créer sur PlanetScale :

npx prisma db push => Pour modifier tous les changements effectués dans la base de données. (Par exemple, si vous avez créer de nouveaux modèles.) `Important, si vous démarrer from scratch, bien s'assurer qu'il y'a :
@prisma/client & prisma dans les dépendances,
Un modèle défini dans le schema.prisma,
Si vous avez créer une nouvelle base de données dans Prisma, utiliser "npx prisma generate" pour la créer avant de faire "npx prisma db push" pour pusher la base de données Prisma vers Planet Scale.`
Il faut faire npx prisma db push à chaque changements des modèles.

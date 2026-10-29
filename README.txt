IORANA — site de services linguistiques
========================================

Site statique en HTML, CSS et JavaScript, sans dépendance de build.

Pages :
- index.html                         Accueil
- a-propos/index.html                À propos
- services/traduction/index.html     Traduction
- services/interpretation/index.html  Interprétation
- services/correction/index.html     Correction
- services/creation-de-contenu/index.html
- services/gestion-de-projets/index.html
- processus/index.html               Processus
- faq/index.html                     FAQ
- contact/index.html                 Contact

Les éléments partagés de navigation et de pied de page sont rendus par les
composants personnalisés de script.js. Les pages sont des documents statiques
distincts afin que chaque route puisse être ouverte directement.

Avant publication :
- Renseignez contactDetails.email et contactDetails.whatsapp dans script.js.
  Le numéro WhatsApp doit être au format international ; les caractères non
  numériques sont retirés lors de la création du lien wa.me.
- Complétez et publiez les mentions légales et la politique de confidentialité,
  puis ajoutez leurs URL dans le pied de page. La politique de cookies n'est pas
  liée, car le site ne met actuellement en œuvre aucun outil de suivi ou cookie.
- Complétez les informations institutionnelles provisoires de la page À propos.
- Les sélecteurs EN et ES sont visuels uniquement : ces versions du site ne sont
  pas disponibles.
- Les polices sont chargées depuis Google Fonts ; une connexion Internet est
  nécessaire pour afficher Cormorant Garamond et Jost.

Pour prévisualiser le site multipage, servez le dossier avec un serveur HTTP
statique et ouvrez la racine du site. Pour Netlify, le dossier du projet peut
être publié comme site statique ; les pages utilisent des chemins depuis la
racine du domaine.

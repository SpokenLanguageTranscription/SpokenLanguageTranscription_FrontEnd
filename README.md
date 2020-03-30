## `Présentation du Projet de R&D Reconnaissance vocale`
 Cette application a été conçu dans le cadre de la réalisation d’un projet en Développement de Logiciel Libre sous la licence CC BY-NC-SA.
L’objectif étant, de réaliser une application qui permettra aux malentendants de participer à une réunion ou à une 
discussion via l’API de reconnaissance vocale de Google.<br />

Notre projet est scindé en 2 parties:
<h4> Partie Frontend </h4>
<h4> Partie Backend </h4>

La partie Front est structuré en composants, nous avons suivi la logique de REACT qui consiste à départager les parties d’une application en arborescence de composants afin de mieux répartir les fonctionnalités et les tâches.<br />

Vu que notre application a besoin d'une reconaissance vocale. Nous avons utiliser le module <b> react-speech-recognition </b>, afin de pouvoir transcrire la parole en texte, qui pourra par la suite être envoyer aux malentendants suis forme de texte.

Nous avons utilisé <b> axios</b> pour pouvoir faire communiquer notre Front et notre Back. C'est un client HTTP populaire basé sur des promesses qui arbore une API facile à utiliser et peut être utilisé à la fois dans le navigateur et Node.js.




### `Démarrage de l'application`

Afin d'assurer le bon fonctionnement de l'application, plusieurs manipulations doivent être réalisées au préalable:

#### `Prérequis`

Installer ReactJS 

```
https://fr.reactjs.org/

```
Récuperer la partie Backend sur Git:
```
https://github.com/SpokenLanguageTranscription/SpokenLanguageTranscription_BackEnd.git

```

Récuperer la partie Frontend sur Git:
```
https://github.com/SpokenLanguageTranscription/SpokenLanguageTranscription_FrontEnd.git

```
Puis ajouter les dépendances entre les differents paquets:
```
npm install dependencies

```
Installer le module de reconnaissance vocale de Google:
```
npm install react-speech-recognition

```

POUR LANCER LE PROJET  : 
```
npm start

```
Il sera lancé sur le port 3000 du localhost (http://localhost:3000)

#### `L'application est deployé est deployé sur le lien suivant :`
```
https://woolkss.herokuapp.com/

```


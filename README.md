## PokeJs — petit jeu Pokémon-like en Canvas

Projet d’apprentissage autour de l’API Canvas (vanilla JavaScript). On affiche une carte, un héros animé déplaçable au clavier, un overlay de menu (WIP) et une musique de fond.

- Canvas HTML5, JS modules ES6
- Aucune lib de rendu externe
- Lancement via un serveur statique (live-server)

## Démo rapide

- Flèches directionnelles pour déplacer le héros
- Échap pour afficher un overlay de menu (en cours, options non interactives)
- La musique démarre au premier appui d’une touche (politique d’autoplay des navigateurs)

## Prérequis

- Node.js et npm installés

## Installation & lancement

1) Installer les dépendances

```bash
npm install
```

2) Démarrer un serveur local (depuis la racine du projet)

```bash
npx live-server .
```

Cela ouvre le jeu sur index.html. Si rien ne s’ouvre, visitez l’URL indiquée dans le terminal.

## Contrôles

- Flèche Haut/Bas/Gauche/Droite: déplacer le joueur
- Échap: afficher l’overlay de menu (WIP)

## Fonctionnalités actuelles

- Chargement des assets (sprites, carte) avant affichage
- Sprite du héros animé par frames (changement de frame selon la direction)
- Déplacements bornés aux limites du canvas
- Boucle de rendu simple (requestAnimationFrame)
- Musique de fond en boucle via un wrapper Audio

## Structure du projet

```text
.
├─ index.html           # Point d’entrée (canvas + charge main.js)
├─ style.css            # Styles de base (pixelated + canvas plein écran)
├─ main.js              # Démarre la MapScene et la boucle draw
├─ assets/
│  ├─ pokeball.png
│  ├─ audio/
│  │  └─ song-theme.mp3
│  └─ sprites/
│     ├─ hero.png
│     └─ map.png
├─ src/
│  ├─ main.js           # (export vide, garde place pour import global)
│  ├─ core/
│  │  ├─ Entity.js
│  │  ├─ Input.js       # Écoute clavier et pilote Player
│  │  ├─ Sprite.js      # Gestion d’un sprite sheet (frames h/v)
│  │  └─ Utils.js       # Petites structures utilitaires (x,y)
│  ├─ engine/
│  │  ├─ AudioGame.js   # Wrapper HTMLAudioElement (loop, volume)
│  │  ├─ Camera.js
│  │  ├─ Game.js
│  │  ├─ Resource.js    # Préchargement d’images (map, hero)
│  │  └─ SceneManager.js
│  ├─ game/
│  │  └─ Player.js      # Logique de déplacement + frame directionnelle
│  └─ scenes/
│     ├─ MapScene.js    # Scène principale (map, player, menu, audio)
│     └─ MenuScene.js   # Overlay menu (WIP)
├─ package.json         # Dépendances (live-server)
└─ README.md
```

## Structure final 
```graphql
pokemon-like/
│── index.html              # Point d'entrée (charge le jeu)
│── style.css               # Style global (HUD, dialogues, menus)
│── assets/                 # Ressources (pixel art, sons, maps)
│   ├── sprites/            # Personnages, monstres, PNJ
│   ├── tilesets/           # Tiles de maps
│   ├── maps/               # JSON des cartes (format maison ou Tiled)
│   └── audio/              # Bruitages, musiques
│
│── src/
│   ├── main.js             # Boot du jeu (init canvas, boucle)
│   ├── engine/             # Cœur technique du moteur
│   │   ├── Game.js         # Boucle principale (update/draw)
│   │   ├── SceneManager.js # Gestion des scènes (menu, map, combat)
│   │   ├── Input.js        # Gestion clavier/manette
│   │   ├── Renderer.js     # Affichage Canvas (sprites, layers, HUD)
│   │   └── Audio.js        # Gestion des sons/musiques
│   │
│   ├── core/               # Composants communs
│   │   ├── Entity.js       # Classe de base (joueur, PNJ, Pokémon)
│   │   ├── Sprite.js       # Chargement & animation de sprite
│   │   └── Utils.js        # Fonctions utilitaires
│   │
│   ├── scenes/             # Écrans/états du jeu
│   │   ├── MapScene.js     # Exploration (déplacements, collisions, dialogues)
│   │   ├── BattleScene.js  # Combats tour par tour
│   │   └── MenuScene.js    # Inventaire, équipe Pokémon, sauvegarde
│   │
│   ├── data/               # Données JSON
│   │   ├── pokedex.json    # Stats, attaques, types
│   │   ├── items.json      # Objets utilisables
│   │   └── trainers.json   # PNJ & dresseurs
│   │
│   └── game/               # Logique gameplay
│       ├── Player.js       # Joueur + interactions
│       ├── NPC.js          # PNJ & dialogues
│       ├── Pokemon.js      # Classe Pokémon (stats, moves, état)
│       ├── BattleSystem.js # Mécanique de combat
│       └── Dialogue.js     # Gestion des dialogues/boîtes de texte
│
└── package.json            # (optionnel, pour bundler/serveur local)
``` 

## API Javascript

- Math.max -> [source Math.max Mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)
- Math.min -> [source Math.min Mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min)
- new Map() -> [source Map Mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- new Audio() -> [source Audio Mdn](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio)
- requestAnimationFrame -> [source requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)


## TODO 

- [x] Afficher carte
- [x] Déplacement tu personnages
- [ ] Gérer la musique (start, stop )
- [ ] Ajouter les collisions
- [ ] Intéragir avec Menu en cours de jeu
- [ ] Ajout d'un menu avant de lancer le jeu
- [ ] Ajout des combats


## Références utiles

- MDN Canvas: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- Tutoriel RPG (inspiration): https://youtu.be/HmxNrlPx8iY
- Exemple de menu Canvas: https://plainenglish.io/blog/create-a-simple-game-menu-using-vanilla-javascript-and-html-canvas

## Notes

- L’overlay menu est en cours d’implémentation (WIP).
- Les assets sont stockés dans le dossier `assets/`.
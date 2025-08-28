# Projet PokeJs

Le but de se projet est de créer un jeu proche de pokemon, en apprenants l'API Canvas de Javascript.

[MDN Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[Sources RPG](https://youtu.be/HmxNrlPx8iY)
## TODO


## STRUCTURE DU PROJET

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
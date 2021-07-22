# IgeVoid

# Avant de lire ou télécharger le github de IgeVoid merci de vous rendre vers la [license](https://github.com/ValRedstone/MultiBot/blob/main/LICENSE)

## Sommaire:
- [Liens](https://github.com/ValRedstone/IgeVoid/blob/main/README.md#liens)
  - [Widgets](https://github.com/ValRedstone/IgeVoid/blob/main/README.md#widgets)

- [Installation](https://github.com/ValRedstone/IgeVoid/blob/main/README.md#installation)
  - [Configuration](https://github.com/ValRedstone/IgeVoid/blob/main/README.md#configuration)
  - [Modules](https://github.com/ValRedstone/IgeVoid/blob/main/README.md#modules)
  - [Lancement](https://github.com/ValRedstone/IgeVoid/blob/main/README.md#lancement)

## Bot Multifonctions opensource créé par ValRedstone.

### Liens

  - [Site](http://igevoid.ml)
  - [Top.gg](https://top.gg/bot/804289381141446666)
  - [Invitation](https://discord.com/api/oauth2/authorize?client_id=804289381141446666&permissions=-1&scope=bot)
  - [Support](https://discord.gg/nDKqMN6cG8)

### Widgets

[![](https://top.gg/api/widget/status/804289381141446666.svg)](https://top.gg/bot/804289381141446666)
[![](https://top.gg/api/widget/servers/804289381141446666.svg)](https://top.gg/bot/804289381141446666)
[![](https://img.shields.io/badge/discord.js-v12.5.3-blue.svg?logo=npm)](https://github.com/discordjs)

[![](https://top.gg/api/widget/804289381141446666.svg)](https://top.gg/bot/804289381141446666)

## Installation:

  Logiciel nécessaires:
  - Node.js
  - NPM
  - Une invite de commande
  - Un éditeur de texte

Pour installer le code sur votre pc vous devez d'abord télécharger le code depuis le github.

### Configuration:

Pour commencer allez dans le fichier [`configs.json`](https://github.com/ValRedstone/MultiBot/blob/main/settings/configs.json) et remplissez le avec ce que vous devez remplir.

```js
{
    "token": "LE TOKEN DE VOTRE BOT", //mettez le token de votre bot
    "prefix": "LE PREFIX DE VOTRE BOT", //mettez le prefix de votre bot

    "support": "LE SUPPORT DE VOTRE BOT", //mettez le lien d'invitation du support de votre bot

    "bugsChannel": "L'ID DU SALON OU VONT ÊTRE REPORT LES BUGS", //mettez l'ID du channel où vont être report les bugs du bot
    "addChannel": "L'ID DU SALON QUI VA LOG LES ENTREE DU BOT SUR UN SERVEUR", //mettez l'ID du channel ou le message du bot va être envoyé quand il rejoint un serveur
    "removeChannel": "L'ID DU SALON QUI VA LOG LES SORTIE DU BOT DES SERVEUR", //mettez l'ID du channel ou le message du bot va être envoyé quand il quitte un serveur
    "logsChannel": "L'ID DU SALON DES LOGS DU BOT", //mettez l'ID du channel ou le bot va vous envoyer les erreurs
    
    "ownerID": "L'ID DU PROPRIETAIRE DU BOT", //mettez votre ID
    
    "everyoneMention": false, //true pour activer la mention everyone, false pour désactiver la mention everyone
    "hostedBy": true, //true pour dire qui offre le lot, false pour ne pas dire qui offre le lot

    "topggToken": "LE TOKEN TOP.GG", //le token top.gg que vou pouvez trouver dans les configurations de votre robot
    "voteHookID": "L'ID DU WEBHOOK DE VOTE SUR VOTRE SERVEUR", //l'ID du webhook de vote sur votre discord
    "voteHookToken": "LE TOKEN DU WEBHOOK DE VOTE SUR VOTRE SERVEUR" //le toekn de webhook de vote sur votre discord
}
```

### Modules:

Une fois cela fait rendez vous dans la console et tapez ceci.

```md
npm i
```

### Lancement:

Quand l'installation des modules est finie tapez ceci dans la console.

```md
node index.js
```

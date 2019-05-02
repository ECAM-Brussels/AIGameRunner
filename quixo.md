# Quixo

## Règles

[https://www.gigamic.com/files/catalog/products/rules/quixo_rule-fr.pdf](https://www.gigamic.com/files/catalog/products/rules/quixo_rule-fr.pdf)

## Intelligence Artificielle

Votre IA doit être un serveur web basé sur ceux que l'on trouve dans le répertoire `ai`.

Ce serveur n'a qu'une route, `move`. Cette route recevra le `body` suivant:

```json
{
	"game": [1, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
	"moves": [],
	"players": ['LUR', 'LRG'],
	"you": 'LUR'
}
```

La clé `game` contient le plateau de jeu qui comporte 25 cubes numérotés comme suit:

| 0| 1| 2| 3| 4|
| 5| 6| 7| 8| 9|
|10|11|12|13|14|
|15|16|17|18|19|
|20|21|22|23|24|

La clé `move` contient la liste de tout les mouvements joués depuis le début de la partie.

Cette route devra répondre par un `JSON` comme celui-ci:

```json
{
	"move": {
		"cube": 0,
		"direction": 'S'
	},
	"message": "I'm Smart"
}
```

Où `cube` est le numéro du cube que l'on déplace et `direction` est le côté (N: Nord, S: Sud, E: Est, W: Ouest) du plateau par lequel on va replacer le cube.
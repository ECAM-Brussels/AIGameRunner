# Quixo

## Règles

[https://www.gigamic.com/files/catalog/products/rules/quixo_rule-fr.pdf](https://www.gigamic.com/files/catalog/products/rules/quixo_rule-fr.pdf)

## Intelligence Artificielle

Votre IA doit être un serveur web basé sur ceux que l'on trouve dans le répertoire `ai`.

Ce serveur n'a qu'une route, `move`. Cette route recevra le `body` suivant:

```python
{
	"game": [1, 0, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None],
	"moves": [],
	"players": ["LUR", "LRG"],
	"you": "LUR"
}
```

La clé `game` contient le plateau de jeu qui comporte 25 cubes numérotés comme suit:

<table>
	<tr>
		<td></td>
		<td colspan="5" align="center">N</td>
		<td></td>
	</tr>
	<tr>
		<td rowspan="5">W</td>
		<td>0</td>
		<td>1</td>
		<td>2</td>
		<td>3</td>
		<td>4</td>
		<td rowspan="5">E</td>
	</tr>
	<tr>
		<td>5</td>
		<td>6</td>
		<td>7</td>
		<td>8</td>
		<td>9</td>
	</tr>
	<tr>
		<td>10</td>
		<td>11</td>
		<td>12</td>
		<td>13</td>
		<td>14</td>
	</tr>
	<tr>
		<td>15</td>
		<td>16</td>
		<td>17</td>
		<td>18</td>
		<td>19</td>
	</tr>
	<tr>
		<td>20</td>
		<td>21</td>
		<td>22</td>
		<td>23</td>
		<td>24</td>
	</tr>
	<tr>
		<td></td>
		<td colspan="5" align="center">S</td>
		<td></td>
	</tr>
</table>

Les valeurs sont `None` pour les cubes blancs, `0` pour les cubes du premier joueur (1<sup>er</sup> dans la liste `players`), `1` pour les cubes du deuxième joueur.

La clé `moves` contient la liste de tout les mouvements joués depuis le début de la partie.

Cette route devra répondre par un `JSON` comme celui-ci:

```python
{
	"move": {
		"cube": 0,
		"direction": "S"
	},
	"message": "I'm Smart"
}
```

Où `cube` est le numéro du cube que l'on déplace et `direction` est le côté (N: Nord, S: Sud, E: Est, W: Ouest) du plateau par lequel on va replacer le cube.

La clé `message` est optionnelle.

Si votre `move` ne respecte pas le format, n'est pas autorisé par les règles ou n'est pas renvoyé dans les 10 secondes, il sera considéré comme un `Bad Move`. Si vous faites 3 `Bad Moves` dans une partie vous perdez par abandon.

## Modalités de remise

Le projet est à réaliser seul ou par binôme.

Votre projet doit être remis via **GitHub**. Nous vous conseillons de créer une *repository* séparée de celle-ci. Elle devra contenir au minimum:
- Le script python de votre Server IA
- Un `README.md` expliquant la stratégie et les bibliothèques utilisées (Et les noms des deux étudiants si fait en binôme)

## Grille de notation

- Le serveur démarre correctement: **2**
- Le serveur a une route `move`: **2**
- La route `move` renvoie un `JSON` correspondant aux spécifications: **2**
- L'état du jeu intervient dans la génération du `move`: **2**
- Le code est convenable (noms des variables et fonctions, commentaires, ...): **2**
- Le fichier `README.md` explique la stratégie et les bibliothèques utilisées: **2**
- La stratégie utilisée est avancée/originale: **1**
- Durant le championnat:
	- L'IA est mieux classée que Random: **2**
	- L'IA génère moins de 3 `Bad Move` par partie (en moyenne): **0.5**
	- L'IA génère moins de 2 `Bad Move` par partie (en moyenne): **0.5**
	- L'IA génère moins de 1 `Bad Move` par partie (en moyenne): **0.5**
	- L'IA n'a généré aucun `Bad Move`: **1**
	- Bonus classement (1<sup>er</sup>: **2.5**, 2<sup>e</sup>: **2**, 3<sup>e</sup>: **1.5**, 4<sup>e</sup>: **1**, 5<sup>e</sup>: **0.5**)

**En cas de plagiat entre groupe, tout les étudiants impliqués auront 0**
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

La clé `move` contient la liste de tout les mouvements joués depuis le début de la partie.

Cette route devra répondre par un `JSON` comme celui-ci:

```json
{
	"move": {
		"cube": 0,
		"direction": "S"
	},
	"message": "I'm Smart"
}
```

Où `cube` est le numéro du cube que l'on déplace et `direction` est le côté (N: Nord, S: Sud, E: Est, W: Ouest) du plateau par lequel on va replacer le cube.
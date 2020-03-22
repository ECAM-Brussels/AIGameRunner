 // Matches

import {html} from '/modules/lit-html/lit-html.js'
import { List } from '/modules/immutable/dist/immutable.es.js'

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));  

export const gameName = "Avalam"

//	Move example:
//	{
//		from: [3, 4],
//		to: [3, 5]
//	}
export const isValidMove = (state, action) => {
	const move = action.move
	const game = state.get('game').toJS()

	if(typeof move !== 'object') return false
	if(move.from === undefined) return false
	if(move.to === undefined) return false
	const from = move.from
	const to = move.to
	if(from.length !== 2) return false
	if(to.length !== 2) return false
	
	return _isValidMove(game, from, to)
}

const _isValidMove = (board, from, to) => {
	try {
		const fromList = board[from[0]][from[1]]
		const toList = board[to[0]][to[1]]
		if(fromList.length === 0) return false
		if(toList.length === 0) return false
		if(from[0] === to[0] && from[1] === to[1]) return false
		if(Math.abs(from[0]-to[0])>1 || Math.abs(from[1]-to[1])>1) return false
		if(fromList.length + toList.length > 5) return false
	}
	catch(error) {
		return false
	}
	return true
}

const E = List([])  //empty

const isEmpty = (board, i, j) => {
	return board[i][j].length === 0
}

const canMove = (board, i, j) => {
	if(isEmpty(board, i, j)) return false
	for(let k=i-1; k<=i+1; k++) {
		for(let l=j-1; l<=j+1; l++) {
			if(_isValidMove(board, [i, j], [k, l]))
				return true
		}
	}
	return false
}

const gameOver = (state) => {
	const board = state.get('game').toJS()
	for(let i=0; i<board.length; i++) {
		const row = board[i]
		for(let j=0; j<row.length; j++) {
			if(canMove(board, i, j)) {
				return false
			}
		}
	}
	return true
}

const computeWinner = (state) => {
	if(!gameOver(state)) return undefined

	console.log('GAME IS OVER')
	const board = state.get('game').toJS()
	const count = [0, 0]
	for(let i=0; i<board.length; i++) {
		const row = board[i]
		for(let j=0; j<row.length; j++) {
			const box = row[j]
			if(box.length > 0) {
				count[box[box.length-1]]++
			}
		}
	}

	if(count[0] === count[1]) return null
	let winner
	if(count[0] > count[1]) winner = 0 
	else winner = 1
	return state.get('players').get(winner)
}

export const gameReducer = (state, action) => {

	switch(action.type) {
		case 'START_MATCH':
			// game: List of List 9x9
			//       Each case contains the List of pion
			//       0s are pions for the first player
			//       1s are poins for the second player
			
			const F = List([0]) //first
			const S = List([1]) //second
			const board = List([
				List([E, E, E, F, S, E, E, E, E]),
				List([E, E, E, S, F, S, F, S, E]),
				List([E, E, S, F, S, F, S, F, S]),
				List([E, E, F, S, F, S, F, S, F]),
				List([E, F, S, F, E, F, S, F, E]),
				List([F, S, F, S, F, S, F, E, E]),
				List([S, F, S, F, S, F, S, E, E]),
				List([E, S, F, S, F, S, E, E, E]),
				List([E, E, E, E, S, F, E, E, E])
			])
			state = state.set('game', board)
			break;

		case 'PLAY_MOVE':
			const game = state.get('game').toJS()
			const move = action.move
			const from = move.from
			const to = move.to
			const fromList = game[from[0]][from[1]]
			const toList = game[to[0]][to[1]]

			const newToList = toList.concat(fromList)

			state = state
			.updateIn(['game', from[0]], row => {
				return row.set(from[1], E)
			})
			.updateIn(['game', to[0]], row => {
				return row.set(to[1], List(newToList))
			})

			const winner = computeWinner(state)
			const players = state.get('players')
			const playerIndex = players.indexOf(action.player)
			const nextPlayer = winner !== undefined ? undefined : players.get((playerIndex + 1) % players.count())

			state = state
			.set('winner', winner)
			.set('player', nextPlayer)
			break
	}

	return state
}

function range(n) {
	const res = []
	for(let i=0; i<n; i++) res.push(i)
	return res
}

export const gameTemplate = (match) => {
	function style(x) {
		let color
		if(x.length === 0) color = 'darkgray'
		else if(x[x.length-1] === 0) color = 'yellow'
		else color = 'pink'

		return `border: 1px solid black; width: 2em; height: 2em; text-align: center; vertical-align: middle;  background-color: ${color};`
	}

	function content(x) {
		if(x.length === 0) return ''
		return x.length
	}

	const board = match.get('game').toJS()

	return html`
		<table style="border-collapse: collapse; border: 1px solid black;">
			${board.map(row => html`
				<tr>
					${row.map(cell => html`
						<td style="${style(cell)}">${content(cell)}</td>
					`)}
				</tr>
			`)}
		</table>
		<p>Winner: ${match.get('winner')}</p>
	`
}
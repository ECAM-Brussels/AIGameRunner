import { gameReducer, isValidMove } from '/game.js'
import { List, Map } from '/modules/immutable/dist/immutable.es.js';
import { addError } from '/js/errors.js'
import { addResult, matchList } from '/js/matchList.js'
import { fetchTimeout } from '/js/fetchTimeout.js'
import { addMessage } from '/js/messages.js'
import { updateStats } from '/js/participants.js'

const delay = 2000  // delay between move requests in milliseconds

export const playMove = (move, player) => {
	return {
		type: 'PLAY_MOVE',
		move,
		player
	}
}

export const addBadMove = (move, player) => (dispatch, getState) => {
	const match = getState().get('match')
	const badMoves = match.get('badMoves').get(player)

	console.log(badMoves)

	if(badMoves < 2) dispatch({
		type: 'ADD_BAD_MOVE',
		move,
		player
	})
	else {
		dispatch({
			type: 'ABANDON_MATCH',
			move,
			player
		})
	} 
}

export const startMatch = (p1, p2) => {
	return {
		type: 'START_MATCH',
		players: [p1, p2]
	}
}

export const clearMatch = () => {
	return {
		type: 'CLEAR_MATCH'
	}
}

export const stopMatch = () => {
	return {
		type: 'STOP_MATCH'
	}
}

export const requestMove = () => (dispatch, getState) => {
	const _state = getState().get('match')
	const participants = getState().get('participants')
	if(_state === null) return

	const state = _state.toJS()
	const player = participants.get(state.player).toJS()
	const url = `http://${player.ip}:${player.port}/move`

	return fetchTimeout(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			game: state.game,
			moves: state.moves,
			players: state.players,
			you: state.player
		})
	}, 10000) // 10 secondes
	.then(response => response.json())
	.then(json => {
		const move = json.move
		const message = json.message
		const action = playMove(move, state.player)
		if(isValidMove(_state, action)) {
			if(message) dispatch(addMessage(state.player, message))
			dispatch(action)
		}
		else throw {error: "Bad Move", action}
	})
}

export const matchReducer = (state = undefined, action) => {
	switch (action.type) {
		case 'START_MATCH':
			if(state === undefined) {
				state = Map({
					game: undefined,
					moves: List(),
					players: List(action.players),
					player: action.players[0],
					winner: undefined,
					badMoves: Map(action.players.reduce((res, p) => {res[p]=0; return res;}, {}))
				})
			}
			break;

		case 'PLAY_MOVE':
			if(state) {
				state = Map({
					game: state.get('game'),
					moves: state.get('moves').push(Map({move: action.move, player: action.player, gameBefore: state.get('game')})),
					players: state.get('players'),
					player: state.get('player'),
					winner: state.get('winner'),
					badMoves: state.get('badMoves')
				})
			}
			break;

		case 'ADD_BAD_MOVE':
			const badMoves = state.get('badMoves').get(action.player) + 1
			if(state) {
				state = Map({
					game: state.get('game'),
					moves: state.get('moves').push(Map({move: action.move, player: action.player, gameBefore: state.get('game'), badMove: true})),
					players: state.get('players'),
					player: state.get('player'),
					winner: state.get('winner'),
					badMoves: state.get('badMoves').set(action.player, badMoves)
				})
			}
			break;
		
		case 'CLEAR_MATCH':
			state = undefined
			break;

		case 'STOP_MATCH':
			state = state.set("winner", null).set("interrupted", true)
			break;

		case 'ABANDON_MATCH':
			const players = state.get('players')
			const winner = players.get((players.indexOf(action.player)+1)%players.count())
			state = state.set('winner', winner).set('abandonned', true)
			break
	}

	state = gameReducer(state, action)

	return state
}

export const runMatch = (p1, p2) => (dispatch, getState) => {
	return new Promise((resolve) => {
		const next = () => {
			const match = getState().get('match')
			if(match.get('winner') === undefined) {
				dispatch(requestMove())
				.then(() => {
					setTimeout(next, delay)
				})
				.catch(err => {
					console.error(err)
					if(err.error === "Time Out") {
						dispatch(addBadMove(err.error, match.get('player')))
					}
					else if(err.error === "Bad Move") {
						dispatch(addBadMove(err.action.move, err.action.player))
					}
					else {
						dispatch(addError(`Request Move Error: ${err}`))
						dispatch(addBadMove(err, match.get('player')))
					}
					setTimeout(next, delay)
				})
			}
			else {
				if(match.get("winner") === null) {
					dispatch(addMessage("Organisateur", "Match nul"))
				}
				else {
					dispatch(addMessage("Organisateur", "Vainqueur: "+match.get("winner")))
				}

				dispatch(addResult(match))
				dispatch(clearMatch())
				dispatch(updateStats())
				resolve()
			}
		}
		
		dispatch(addMessage("Organisateur", p1+" contre "+p2))
		dispatch(startMatch(p1, p2))
		next()
	})
}

export const runRemainingMatches = () => (dispatch, getState) => {
	const state = getState()
	const list = matchList(state.get("participants")).sortBy(Math.random)

	let promise = Promise.resolve()

	for(let opponents of list) {
		console.log(opponents.toJS())
		const P1 = opponents.get(0)
		const P2 = opponents.get(1)
		promise = promise
		.finally(() => {
			console.log(P1, 'vs', P2)
			return dispatch(runMatch(P1, P2))
		})
	}
}
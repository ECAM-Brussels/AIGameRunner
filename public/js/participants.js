import { List, Map } from '/modules/immutable/dist/immutable.es.js'
import { addError } from './errors.js'

// Add Participant Action Creator
// ! Use the thunk Middleware
export const addParticipant = (name, ip, port) => (dispatch, getState) => {
	if(getState().get('participants').has(name)) {
		dispatch(addError(`Name ${name} already used`))
		return
	}

	dispatch({ 
		type: 'ADD_PARTICIPANT',
		participant: {
			name,
			ip,
			port,
			points: 0,
			nbMatch: 0,
			badMoves: 0
		}
	})
}

export const removeParticipant = (name) => ({
	type: 'REMOVE_PARTICIPANT',
	name
})

export const updateStats = () => ({
	type: 'UPDATE_STATS'
})

// Reducer
export const participants = (state = Map(), action) => {
	switch (action.type) {
		case 'ADD_PARTICIPANT':
			return state.set(action.participant.name, Map(action.participant))
		case 'REMOVE_PARTICIPANT':
			return state.delete(action.name)
		default:
			return state
	}
}

const getStatItem = (obj, key, cb) => {
	if(obj[key] === undefined) {
		obj[key] = {
			points: 0,
			nbMatch: 0,
			badMoves: 0
		}
	}

	cb(obj[key])
}

export const stats = (state, action) => {
	switch (action.type) {
		case 'UPDATE_STATS':
			const stats = state.get("results").valueSeq().reduce((stats, match) => {
				for(let i=0; i<2; i++) {
					getStatItem(stats, match.get("players").get(i), (stat) => {
						if(match.get("winner") === null) {
							stat.points += 1
						}
						else if(match.get("players").get(i) === match.get("winner")) {
							stat.points += 3
						}
						stat.nbMatch ++
						stat.badMoves += match.get("badMoves").get(match.get("players").get(i))
					})
				}

				return stats
			}, {})
			
			state.get("participants").keySeq().forEach(player => {
				let thePlayer = state.get("participants").get(player)
				thePlayer = thePlayer.set("points", stats[player] ? stats[player].points : 0)
				thePlayer = thePlayer.set("badMoves", stats[player] ? stats[player].badMoves : 0)
				thePlayer = thePlayer.set("nbMatch", stats[player] ? stats[player].nbMatch : 0)
				const participants = state.get("participants").set(player, thePlayer)
				state = state.set("participants", participants)
			})
			return state
		default:
			return state
	}
}

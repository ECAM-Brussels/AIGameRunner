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
			port
		}
	})
}

export const removeParticipant = (name) => ({
	type: 'REMOVE_PARTICIPANT',
	name
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

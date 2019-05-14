import { List, Map } from '/modules/immutable/dist/immutable.es.js'
import { addMessage } from '/js/messages.js'

export const addError = (msg) => (dispatch, getState) => {
	dispatch(addMessage("Organisateur", msg))
	dispatch({
		type: 'ADD_ERROR',
		msg
	})
}

export const removeError = (id) => ({
	type: 'REMOVE_ERROR',
	id
})

export const errors = (state = List(), action) => {
	switch (action.type) {
		case 'ADD_ERROR':
			return state.push(Map({msg: action.msg}))
		case 'REMOVE_ERROR':
			return state.delete(action.id)
		default:
			return state
	}
}
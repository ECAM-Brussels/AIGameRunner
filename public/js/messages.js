import { List, Map } from '/modules/immutable/dist/immutable.es.js'

export const addMessage = (name, msg) => ({
	type: 'ADD_MESSAGE',
	name,
	msg
})

export const messages = (state = List(), action) => {
	switch (action.type) {
		case 'ADD_MESSAGE':
			state = state.push(Map({name: action.name, msg: action.msg}))
			if(state.count() > 100) {
				state = state.rest()
			}
			return state
		default:
			return state
	}
}
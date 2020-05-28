import { createStore, applyMiddleware  } from '/modules/redux/es/redux.mjs'
import { participants, stats } from './participants.js'
import { errors } from './errors.js'
import { messages } from './messages.js'
import { Map } from '/modules/immutable/dist/immutable.es.js'
import { matchReducer } from '/js/match.js'
import { results } from '/js/matchList.js'

// Logger Middleware
const logger = store => next => action => {
	console.group(action.type)
	console.info('dispatching', action)
	const result = next(action)
	//console.log('next state', store.getState().toJS())
	console.groupEnd()
	return result
}

/**
 * Lets you dispatch a function instead of an action.
 * This function will receive `dispatch` and `getState` as arguments.
 *
 * Useful for early exits (conditions over `getState()`), as well
 * as for async control flow (it can `dispatch()` something else).
 *
 * `dispatch` will return the return value of the dispatched function.
 */
const thunk = store => next => action =>
	typeof action === 'function'
		? action(store.dispatch, store.getState)
		: next(action)

// Reducer
const reducer = (state = Map(), action) => {
	state =  Map({
		participants: participants(state.get('participants'), action),
		errors: errors(state.get('errors'), action),
		match: matchReducer(state.get('match'), action),
		results: results(state.get('results'), action),
		messages: messages(state.get('messages'), action)
	})

	return stats(state, action)
}

export const store = createStore(reducer, applyMiddleware(thunk, logger))

//store.subscribe(() => localStorage.setItem('state', JSON.stringify(store.getState())))
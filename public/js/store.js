import { createStore, applyMiddleware  } from '/modules/redux/es/redux.mjs'
import { participants } from './participants.js'
import { errors } from './errors.js'
import { Map } from '/modules/immutable/dist/immutable.es.js'
import { matchReducer } from '/js/match.js'
import { results } from '/js/matchList.js'

// Logger Middleware
const logger = store => next => action => {
	console.group(action.type)
	console.info('dispatching', action)
	const result = next(action)
	console.log('next state', store.getState().toJS())
	console.groupEnd()
	return result
}

// Crash Reporter Middleware
const crashReporter = store => next => action => {
	try {
		return next(action)
	}
	catch (err) {
		console.error('Caught an exception!', err)
		Raven.captureException(err, {
			extra: {
				action,
				state: store.getState()
			}
		})
		throw err
	}
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
	return Map({
		participants: participants(state.get('participants'), action),
		errors: errors(state.get('errors'), action),
		match: matchReducer(state.get('match'), action),
		results: results(state.get('results'), action)
	})
}

export const store = createStore(reducer, applyMiddleware(thunk, logger, crashReporter))

store.subscribe(() => localStorage.setItem('state', JSON.stringify(store.getState())))
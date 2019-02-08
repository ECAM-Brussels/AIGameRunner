import { createStore } from '/modules/redux/es/redux.mjs'
import { Immutable } from '/modules/immutable/dist/immutable.es.js'

// Reducer
function counter(state = 0, action) {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1
		case 'DECREMENT':
			return state - 1
		default:
			return state
	}
}

const store = createStore(counter)

store.subscribe(() => console.log(store.getState()))
store.subscribe(() => localStorage.setItem('state', JSON.stringify(store.getState())))

export default store
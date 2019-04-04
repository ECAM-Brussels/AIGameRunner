import {store} from '/js/store.js'
import {render} from '/modules/lit-html/lit-html.js'
import {mainTemplate} from '/js/mainTemplate.js'
import {addParticipant, removeParticipant} from '/js/participants.js'

document.addEventListener("DOMContentLoaded", event => {
	//DOM fully loaded and parsed

	store.subscribe(() => {render(mainTemplate(store.getState()), document.getElementById('slot'))})

	const state = JSON.parse(localStorage.getItem('state'))
	console.log(state)
	if(state && state.participants) {
		Object.keys(state.participants).map(name => {
			const participant = state.participants[name]
			store.dispatch(addParticipant(participant.name, participant.ip, participant.port))
		})
	}

	store.dispatch({type: "FIRST_RENDER"})

	//store.dispatch(addParticipant('Player 1', 'localhost', '8080'))
	//store.dispatch(addParticipant('Player 2', 'localhost', '8081'))
})
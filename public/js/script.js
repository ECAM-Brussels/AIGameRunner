import store from './store.js'
import {render} from '/modules/lit-html/lit-html.js'
import mainTemplate from './mainTemplate.js'
import {addParticipant, removeParticipant} from './participants.js'

document.addEventListener("DOMContentLoaded", event => {
	//DOM fully loaded and parsed

	store.subscribe(() => {render(mainTemplate(store.getState()), document.getElementById('slot'))})

	store.dispatch(addParticipant('LUR', '1', '1'))
	store.dispatch(addParticipant('CBF', '2', '1'))
	store.dispatch(addParticipant('LUR', '3', '1'))
	store.dispatch(removeParticipant("LUR"))
})
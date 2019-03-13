import {store} from '/js/store.js'
import {render} from '/modules/lit-html/lit-html.js'
import {mainTemplate} from '/js/mainTemplate.js'
import {addParticipant, removeParticipant} from '/js/participants.js'

document.addEventListener("DOMContentLoaded", event => {
	//DOM fully loaded and parsed

	store.subscribe(() => {render(mainTemplate(store.getState()), document.getElementById('slot'))})

	store.dispatch(addParticipant('LUR', '1', '1'))
	store.dispatch(addParticipant('CBF', '2', '1'))
	store.dispatch(addParticipant('LRG', '3', '1'))
	store.dispatch(addParticipant('DKP', '4', '1'))
})
import store from '/js/store.js'
import {html, render} from '/modules/lit-html/lit-html.js';
import mainTemplate from '/js/mainTemplate.js'

document.addEventListener("DOMContentLoaded", event => {
	//DOM fully loaded and parsed

	store.subscribe(() => {render(mainTemplate(store.getState()), document.getElementById('slot'))})

	store.dispatch({ type: 'INCREMENT' })
	store.dispatch({ type: 'INCREMENT' })
	store.dispatch({ type: 'DECREMENT' })
})
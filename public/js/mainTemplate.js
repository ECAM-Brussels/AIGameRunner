import {html} from '/modules/lit-html/lit-html.js'
import {participantListTemplate} from '/js/participantListTemplate.js'
import {matchListTemplate} from '/js/matchListTemplate.js'
import {addParticipant} from '/js/participants.js'
import {store} from '/js/store.js'
import '/js/mdcTextField.js'

export const mainTemplate = state => html`
	<header class="mdc-top-app-bar">
		<div class="mdc-top-app-bar__row">
			<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
				<a href="#" class="material-icons mdc-top-app-bar__navigation-icon">menu</a>
				<span class="mdc-top-app-bar__title">AI Game Runner</span>
			</section>
		</div>
	</header>
	<div id="container" class="mdc-top-app-bar--fixed-adjust">
		<main>
			<form id="add-participant-form" class="mdc-elevation--z6" @submit="${(event) => {
				const name = event.target.querySelector('mdc-text-field[name="name"]')
				const ip = event.target.querySelector('mdc-text-field[name="ip"]')
				const port = event.target.querySelector('mdc-text-field[name="port"]')
				store.dispatch(addParticipant(name.value, ip.value, port.value))
				name.value = ""
				ip.value = ""
				port.value = ""
				name.focus()
				event.preventDefault()
			}}">
				<mdc-text-field label="Name" name="name"></mdc-text-field>
				<mdc-text-field label="IP" name="ip"></mdc-text-field>
				<mdc-text-field label="Port" name="port"></mdc-text-field>
				<button class="mdc-button mdc-button--raised" type="submit">
					<span class="mdc-button__label">Add Participant</span>
				</button>
			</form>
			<div class="row">
				${participantListTemplate(state.get('participants'))}
				${matchListTemplate(state.get('participants'))}
			</div>
		</main>
	</div>
	<div id="fabs">
		<button class="mdc-fab" aria-label="Add" @click="${() => {}}">
			<span class="mdc-fab__icon material-icons">play_arrow</span>
		</button>
	</div>
`
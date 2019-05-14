import {html} from '/modules/lit-html/lit-html.js'
import {participantListTemplate} from '/js/participantListTemplate.js'
import {matchListTemplate} from '/js/matchListTemplate.js'
import {addParticipant} from '/js/participants.js'
import {store} from '/js/store.js'
import '/js/mdcTextField.js'
import { gameName } from '/games/current.js'
import { runRemainingMatches, stopMatch } from '/js/match.js'
import {gameTemplate} from '/games/current.js'

export const mainTemplate = state => {
	const match = state.get('match')
	return html`
	<header class="mdc-top-app-bar">
		<div class="mdc-top-app-bar__row">
			<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
				<a href="#" class="material-icons mdc-top-app-bar__navigation-icon">menu</a>
				<span class="mdc-top-app-bar__title">AI Game Runner: ${gameName}</span>
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
				${matchListTemplate(state)}
				<div id="match-card" class="mdc-elevation--z4">
					${match ? html`
						<h2>${match.get('players').get(0)} vs ${match.get('players').get(1)}</h2>
						<h4># ${state.get("results").count()} / ${Math.pow(state.get("participants").count(), 2) - state.get("participants").count()}</h4>
						<div>
							${gameTemplate(match)}
						</div>
						<button class="mdc-button mdc-button--raised" @click="${() => {
							store.dispatch(stopMatch())
						}}">
							<span class="mdc-button__label">Stop</span>
						</button>
					` : ''}
				</div>
				<div id="messages" class="mdc-elevation--z4">
					${state.get("messages").reverse().slice(0, 100).map(message => html`
						<div class="message">
							<h5>${message.get("name")}:</h5>
							<p>${message.get("msg")}</p>
						</div>
					`)}
				</div>
			</div>
		</main>
	</div>
	<div id="fabs">
		<button class="mdc-fab" aria-label="Run All" @click="${() => {store.dispatch(runRemainingMatches())}}">
			<span class="mdc-fab__icon material-icons">play_arrow</span>
		</button>
		<a class="mdc-fab" aria-label="Export JSON" href="${'data:text/plain;charset=utf-8,' + JSON.stringify(state.toJS())}" download="state.json">
			<span class="mdc-fab__icon material-icons">get_app</span>
		</a>
	</div>
`}
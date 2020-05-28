import {html} from '/modules/lit-html/lit-html.js'
import {unsafeHTML} from '/modules/lit-html/directives/unsafe-html.js';
import {participantListTemplate} from '/js/participantListTemplate.js'
import {matchListTemplate} from '/js/matchListTemplate.js'
import {addParticipant} from '/js/participants.js'
import {store} from '/js/store.js'
import '/js/mdcTextField.js'
import { gameName } from '/game.js'
import { runRemainingMatches, stopMatch } from '/js/match.js'
import {gameTemplate} from '/game.js'

const sanitize_option = {
	allowedTags: [ 'b', 'i', 'em', 'strong', 'span', 'div', 'br', 'img'],
	allowedAttributes: {
		'*': ['style', 'class'],
		'img': ['src']
	},
	selfClosing: [ 'img' ]
}

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
 
	element.style.display = 'none';
	document.body.appendChild(element);
 
	element.click();
 
	document.body.removeChild(element);
}

export const mainTemplate = state => {
	const match = state.get('match')
	return html`
	<header class="mdc-top-app-bar">
		<div class="mdc-top-app-bar__row">
			<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
				<a href="#" class="material-icons mdc-top-app-bar__navigation-icon">menu</a>
				<span class="mdc-top-app-bar__title">AI Game Runner: ${gameName}</span>
			</section>
			<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
				<button class="mdc-button mdc-top-app-bar__action-item" @click=${() => {stopClientFetching()}} >
					<span class="mdc-button__label">Stop Inscription</span>
				</button>
			</section>
		</div>
	</header>
	<div id="container" class="mdc-top-app-bar--fixed-adjust">
		<main>
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
							<p>${unsafeHTML(sanitizeHtml(message.get("msg"), sanitize_option))}</p>
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
		<button class="mdc-fab" aria-label="Run All" @click="${() => {download('state.json', JSON.stringify(state.toJS()))}}">
			<span class="mdc-fab__icon material-icons">get_app</span>
		</button>
	</div>
`}
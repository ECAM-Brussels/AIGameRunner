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
				<span class="mdc-top-app-bar__title">IA Game Runner</span>
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
		<button class="mdc-fab" aria-label="Add" @click="${() => {store.dispatch(addParticipant("MLT", 1, 1))}}">
			<span class="mdc-fab__icon material-icons">add</span>
		</button>
	</div>
	<div class="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content">
		<div class="mdc-dialog__container">
			<div class="mdc-dialog__surface">
				<!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
				<h2 class="mdc-dialog__title" id="my-dialog-title">Add Participant</h2>
				<div class="mdc-dialog__content" id="my-dialog-content">
					<div>
						<div class="mdc-text-field mdc-text-field--outlined mdc-text-field--focused">
							<input type="text" id="add-participant-name" class="mdc-text-field__input">
							<div class="mdc-notched-outline mdc-notched-outline--notched">
								<div class="mdc-notched-outline__leading"></div>
									<div class="mdc-notched-outline__notch">
										<label for="add-participant-name" class="mdc-floating-label mdc-floating-label--float-above">Name</label>
									</div>
								<div class="mdc-notched-outline__trailing"></div>
							</div>
						</div>
					</div>
					<div>
						<div class="mdc-text-field mdc-text-field--outlined mdc-text-field--focused">
							<input type="text" id="add-participant-ip" class="mdc-text-field__input">
							<div class="mdc-notched-outline mdc-notched-outline--notched">
								<div class="mdc-notched-outline__leading"></div>
									<div class="mdc-notched-outline__notch">
										<label for="add-participant-ip" class="mdc-floating-label mdc-floating-label--float-above">IP</label>
									</div>
								<div class="mdc-notched-outline__trailing"></div>
							</div>
						</div>
					</div>
					<div>
						<div class="mdc-text-field mdc-text-field--outlined mdc-text-field--focused">
							<input type="text" id="add-participant-port" class="mdc-text-field__input">
							<div class="mdc-notched-outline mdc-notched-outline--notched">
								<div class="mdc-notched-outline__leading"></div>
									<div class="mdc-notched-outline__notch">
										<label for="add-participant-port" class="mdc-floating-label mdc-floating-label--float-above">Port</label>
									</div>
								<div class="mdc-notched-outline__trailing"></div>
							</div>
						</div>
					</div>
				</div>
				<footer class="mdc-dialog__actions">
					<button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" @click="${() => {
						const name = document.getElementById('add-participant-name').value
						const ip = document.getElementById('add-participant-ip').value
						const port = document.getElementById('add-participant-port').value
						store.dispatch(addParticipant(name, ip, port))
						document.getElementById('add-participant-name').value = ""
						document.getElementById('add-participant-ip').value = ""
						document.getElementById('add-participant-port').value = ""
					}}">
						<span class="mdc-button__label">OK</span>
					</button>
				</footer>
			</div>
		</div>
	<div class="mdc-dialog__scrim"></div>
`
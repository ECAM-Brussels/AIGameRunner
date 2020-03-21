import {html} from '/modules/lit-html/lit-html.js'
import {removeParticipant} from '/js/participants.js'
import {store} from '/js/store.js'

export const participantListTemplate = participants => html`
	<ul id="participantList" class="mdc-list mdc-list--two-line mdc-elevation--z4">
		${participants.sort((A, B) => B.get("points") - A.get("points")).map(participant => html`
			<li class="mdc-list-item">
				<span class="mdc-list-item__text">
					<span class="mdc-list-item__primary-text">${participant.get('name')} <small>(${participant.get('points')}, ${participant.get('nbMatch') === 0 ? '-' : participant.get('badMoves') / participant.get('nbMatch') })</small></span>
					<span class="mdc-list-item__secondary-text">${participant.get('ip')}:${participant.get('port')}</span>
				</span>
				<span class="mdc-list-item__meta material-icons" style="cursor: pointer" @click="${() => {
						fetch('/remove', {
							method: 'POST',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({name: participant.get('name')})
						})
						.then(() => {
							store.dispatch(removeParticipant(participant.get('name')))
						})
                }}">cancel</span>
			</li>
		`).valueSeq().toArray()}
	</ul>
`
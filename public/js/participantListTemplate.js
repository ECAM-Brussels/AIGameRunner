import {html} from '/modules/lit-html/lit-html.js'
import {removeParticipant} from '/js/participants.js'
import {store} from '/js/store.js'

export const participantListTemplate = participants => html`
	<ul id="participantList" class="mdc-list mdc-list--two-line mdc-elevation--z4">
		${participants.map(participant => html`
			<li class="mdc-list-item">
				<span class="mdc-list-item__text">
					<span class="mdc-list-item__primary-text">${participant.get('name')}</span>
					<span class="mdc-list-item__secondary-text">${participant.get('ip')}:${participant.get('port')}</span>
				</span>
				<span class="mdc-list-item__meta material-icons" style="cursor: pointer" @click="${() => {
                    store.dispatch(removeParticipant(participant.get('name')))
                }}">cancel</span>
			</li>
		`).valueSeq().toArray()}
	</ul>
`
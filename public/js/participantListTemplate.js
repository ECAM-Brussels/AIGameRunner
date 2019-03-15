import {html} from '/modules/lit-html/lit-html.js'

export const participantListTemplate = participants => html`
	<ul id="participantList" class="mdc-list mdc-list--two-line mdc-elevation--z4">
		${participants.map(participant => html`
			<li class="mdc-list-item">
				<span class="mdc-list-item__text">
					<span class="mdc-list-item__primary-text">${participant.get('name')}</span>
					<span class="mdc-list-item__secondary-text">${participant.get('ip')}:${participant.get('port')}</span>
				</span>
			</li>
		`).valueSeq().toArray()}
	</ul>
`
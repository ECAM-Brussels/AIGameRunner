import {html} from '/modules/lit-html/lit-html.js'

export const participantListTemplate = participants => html`
	<div id="participantList">
        ${participants.map(participant => html`
            <div>
                ${participant.get('name')}
                <small>${participant.get('ip')}:${participant.get('port')}</small>
            </div>
        `).valueSeq().toArray()}
	</div>
`
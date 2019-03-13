import {html} from '/modules/lit-html/lit-html.js'
import {match} from '/js/match.js'

export const matchListTemplate = participants => html`
	<div id="matchList">
        ${match(participants).map(match => html`
            <div>
                <div>${match.get(0)}</div>
                <div>${match.get(1)}</div>
            </div>
        `).toArray()}
	</div>
`
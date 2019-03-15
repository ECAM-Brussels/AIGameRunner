import {html} from '/modules/lit-html/lit-html.js'
import {matchList} from '/js/matchList.js'

export const matchListTemplate = participants => html`
	<ul id="matchList" class="mdc-list mdc-elevation--z4">
        ${matchList(participants).map(match => html`
            <li class="mdc-list-item">
                <span class="mdc-list-item__text">
                    ${match.get(0)}<br>
					${match.get(1)}
				</span>
            </li>
        `).toArray()}
    </ul>
`
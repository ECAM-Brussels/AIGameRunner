import {html} from '/modules/lit-html/lit-html.js'
import {matchList} from '/js/matchList.js'
import {store} from '/js/store.js'
import {runMatch} from '/js/match.js'

export const matchListTemplate = participants => html`
	<ul id="matchList" class="mdc-list mdc-elevation--z4">
        ${matchList(participants).map(match => html`
            <li class="mdc-list-item">
                <span class="mdc-list-item__text">
                    ${match.get(0)}<br>
					${match.get(1)}
                </span>
                <span class="mdc-list-item__meta material-icons" style="cursor: pointer" @click="${() => {
                    const state = store.getState()
                    const participants = state.get('participants')
                    store.dispatch(runMatch(match.get(0), match.get(1)))
                }}">play_arrow</span>
            </li>
        `).toArray()}
    </ul>
`
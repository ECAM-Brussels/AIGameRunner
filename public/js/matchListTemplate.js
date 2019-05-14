import {html} from '/modules/lit-html/lit-html.js'
import {matchList} from '/js/matchList.js'
import {store} from '/js/store.js'
import {runMatch} from '/js/match.js'

export const matchListTemplate = state => {
	const participants = state.get('participants')
	
	return html`
		<ul id="matchList" class="mdc-list mdc-elevation--z4">
			${matchList(participants).map(match => {
				const theMatch = state.get("results").get(match.get(0)+"|"+match.get(1))
				const winner = theMatch !== undefined ? theMatch.get("winner") : undefined
				return html`
					<li class="mdc-list-item">
						<span class="mdc-list-item__text">
							<span class="${winner === match.get(0) ? 'winner' : ''}">${match.get(0)}</span><br>
							<span class="${winner === match.get(1) ? 'winner' : ''}">${match.get(1)}</span>
						</span>
						<span class="mdc-list-item__meta material-icons" style="cursor: pointer" @click="${() => {
							store.dispatch(runMatch(match.get(0), match.get(1)))
						}}">play_arrow</span>
					</li>
				`
			}).toArray()}
		</ul>
	`
}
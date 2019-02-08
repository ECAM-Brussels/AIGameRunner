import {html, render} from '/modules/lit-html/lit-html.js';

const mainTemplate = state => html`
	<div id="container" class="mdc-typography">
		<header class="mdc-top-app-bar">
			<div class="mdc-top-app-bar__row">
				<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
					<a href="#" class="material-icons mdc-top-app-bar__navigation-icon">menu</a>
					<span class="mdc-top-app-bar__title">Title</span>
				</section>
			</div>
		</header>
		<main class="mdc-top-app-bar--fixed-adjust">
			Compteur: ${state} 
		</main>
	</div>
`

export default mainTemplate
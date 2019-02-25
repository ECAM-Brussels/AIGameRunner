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
		<div id="mainRow" class="mdc-top-app-bar--fixed-adjust">
			<aside class="mdc-elevation--z4">

			</aside>
			<main>
				Compteur: ${state} 
			</main>
		</div>
	</div>
`

export default mainTemplate
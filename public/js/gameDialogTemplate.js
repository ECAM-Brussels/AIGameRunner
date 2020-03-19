import {html} from '/modules/lit-html/lit-html.js'
import {gameTemplate} from '/game.js'

export const gameDialogTemplate = match => html`
    <div class="mdc-dialog ${match ? 'mdc-dialog--open' : ''}" role="alertdialog" aria-modal="true" aria-labelledby="game-dialog-title">
        <div class="mdc-dialog__container">
            <div class="mdc-dialog__surface">
                <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
                <h2 class="mdc-dialog__title" id="game-dialog-title">${match ? match.get('players').get(0) : ''} vs ${match ? match.get('players').get(1) : ''}</h2>
                <div class="mdc-dialog__content">
                    ${match ? html`<p>${match.get('message')}</p>` : ''}
                    ${match ? gameTemplate(match) : ''}
                </div>
            </div>
        </div>
        <div class="mdc-dialog__scrim"></div>
    </div>
`


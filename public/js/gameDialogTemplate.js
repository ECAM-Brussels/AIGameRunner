import {html} from '/modules/lit-html/lit-html.js'
import {gameTemplate} from '/games/current.js'

export const gameDialogTemplate = match => html`
    <div class="mdc-dialog ${match ? 'mdc-dialog--open' : ''}" role="alertdialog" aria-modal="true" aria-labelledby="game-dialog-title">
        <div class="mdc-dialog__container">
            <div class="mdc-dialog__surface">
                <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
                <h2 class="mdc-dialog__title" id="game-dialog-title">P1 vs P2</h2>
                <div class="mdc-dialog__content">
                    ${match ? gameTemplate(match) : ''}
                </div>
            </div>
        </div>
        <div class="mdc-dialog__scrim"></div>
    </div>
`


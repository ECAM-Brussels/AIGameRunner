import {html, render} from '/modules/lit-html/lit-html.js'

class MDC_Switch extends HTMLElement {
    constructor() {
        super()
    }

    render() {
        return html`
            <div class="mdc-switch">
                <div class="mdc-switch__track"></div>
                <div class="mdc-switch__thumb-underlay">
                    <div class="mdc-switch__thumb">
                        <input type="checkbox" id="basic-switch" class="mdc-switch__native-control" role="switch">
                    </div>
                </div>
            </div>
        `
    }

    connectedCallback() {
        render(this.render(), this)
        this.switchControl = new mdc.switchControl.MDCSwitch(this.querySelector('.mdc-switch'));
    }
}

customElements.define('mdc-switch', MDC_Switch)
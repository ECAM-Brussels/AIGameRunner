import {html, render} from '/modules/lit-html/lit-html.js'

class MDC_TextField extends HTMLElement {
    constructor() {
        super()
        this.label = this.getAttribute("label")
        this.name = this.getAttribute("name")
    }

    render() {
        return html`
            <div class="mdc-text-field mdc-text-field--outlined">
                <input type="text" id="tf-outlined" class="mdc-text-field__input" name="${this.name}">
                <div class="mdc-notched-outline">
                    <div class="mdc-notched-outline__leading"></div>
                    <div class="mdc-notched-outline__notch">
                        <label for="tf-outlined" class="mdc-floating-label">${this.label}</label>
                    </div>
                    <div class="mdc-notched-outline__trailing"></div>
                </div>
            </div>
        `
    }

    connectedCallback() {
        render(this.render(), this)
        this.textfield = new mdc.textField.MDCTextField(this.querySelector('.mdc-text-field'))
    }

    get value() {
        return this.textfield.value
    }

    set value(v) {
        this.textfield.value = v
    }

    focus() {
        this.querySelector("input").focus()
    }
}

customElements.define('mdc-text-field', MDC_TextField)
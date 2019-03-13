import {html} from '/modules/lit-html/lit-html.js'
import '/js/mdcSwitch.js'

const toggle = (event) => {
    console.log(event)
    //console.log(this)
    console.log("TOGGLE...")
}

const sidebarTemplate = state => html`
    <mdc-switch @click="${() => {toggle(this)}}"></mdc-switch>
`

export default sidebarTemplate
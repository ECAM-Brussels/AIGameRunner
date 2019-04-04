// Matches

import {html} from '/modules/lit-html/lit-html.js'

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));  

export const gameName = "Matches"

export const isValidMove = (state, action) => {
    const move = action.move
    state = state.get('game')

    if(typeof move !== 'number') return false
    if(move < 1) return false
    if(move > 3) return false
    if(move > state) return false
    return true
}

export const gameReducer = (state, action) => {

    switch(action.type) {
        case 'START_MATCH':
            state = state.set('game', getRandomInt(5) + 10)
            break;

        case 'PLAY_MOVE':
            const n = state.get('game') - action.move

            const winner = n === 0 ? action.player : undefined

            const players = state.get('players')
            const playerIndex = players.indexOf(action.player)
            const nextPlayer = n === 0 ? undefined : players.get((playerIndex + 1) % players.count())

            state = state
            .set('game', n)
            .set('player', nextPlayer)
            .set('winner', winner)
            break;
    }

    return state
}

function range(n) {
    const res = []
    for(let i=0; i<n; i++) res.push(i)
    return res
}

export const gameTemplate = (match) => {
    return html`
        Remaining: ${range(match.get('game')).map(() => "| ")}<br>
        Winner: ${match.get('winner')}
    `
}
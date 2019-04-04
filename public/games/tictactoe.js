// Tic Tac Toe

import {html} from '/modules/lit-html/lit-html.js'
import { List } from '/modules/immutable/dist/immutable.es.js';

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

export const gameName = "Tic Tac Toe"

export const isValidMove = (state, action) => {
    const move = action.move
    state = state.get('game')

    if(typeof move !== 'number') return false
    if(move < 0) return false
    if(move > 8) return false
    if(state.get(move) !== null) return false
    return true
}

export const gameReducer = (state, action) => {

    switch(action.type) {
        case 'START_MATCH':
            const game = []
            for(let i=0; i<9; i++) game.push(null)
            state = state.set('game', List(game))
            break;

        case 'PLAY_MOVE':
            const players = state.get('players')
            const playerIndex = players.indexOf(action.player)
            const nextGame = state.get('game').set(action.move, playerIndex)

            function check(list, indices) {
                const res = []
                for(const i of indices) {
                    res.push(list.get(i))
                }
                return res.reduce((acc, item) => acc === item && acc !== null ? acc : undefined)
            }

            const lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ]

            let winner
            for(const line of lines) {
                winner = check(nextGame, line)
                if(winner !== undefined)
                    break
            }

            // match null
            if(winner === undefined && !nextGame.some(item => item === null)) {
                console.log('MATCH NULL')
                winner = null
            }

            winner = typeof winner === 'number' ? players.get(winner) : winner

            const nextPlayer = winner !== undefined ? undefined : players.get((playerIndex + 1) % players.count())

            state = state
            .set('game', nextGame)
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
    function display(x) {
        if(x === 0) return 'X'
        if(x === 1) return 'O'
        return ''
    }
    const game = match.get('game')
    return html`
        <table style="border-collapse: collapse; border: 1px solid black;">
            ${range(3).map(line => html`
                <tr>
                    ${range(3).map(column => html`
                        <td style="border: 1px solid black; width: 2em; height: 2em; text-align: center; vertical-align: middle">${display(game.get(line*3+column))}</td>
                    `)}
                </tr>
            `)}
        </table>
        <p>Winner: ${match.get('winner')}</p>
    `
}
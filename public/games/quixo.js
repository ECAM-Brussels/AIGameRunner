// Quixo

import {html} from '/modules/lit-html/lit-html.js'
import { List } from '/modules/immutable/dist/immutable.es.js';

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

export const gameName = "Quixo"

const sides = [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24]
const directions = ['N', 'S', 'E', 'W']
const forbidden = {
    'E': [4, 9, 14, 19, 24],
    'W': [0, 5, 10, 15, 20],
    'N': [0, 1, 2, 3, 4],
    'S': [20, 21, 22, 23, 24]
}
const increments = {
    'N': -5,
    'S': +5,
    'E': 1,
    'W': -1
}
const lines = [
    [ 0,  1,  2,  3,  4],
    [ 5,  6,  7,  8,  9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [ 0,  5, 10, 15, 20],
    [ 1,  6, 11, 16, 21],
    [ 2,  7, 12, 17, 22],
    [ 3,  8, 13, 18, 23],
    [ 4,  9, 14, 19, 24],
    [ 0,  6, 12, 18, 24],
    [ 4,  8, 12, 16, 20]
]

export const isValidMove = (state, action) => {
    // move => {
    //     "cube": <cube-position>,
    //     "direction": <N,S,E,W>
    // }
    //           N
    //   | 0| 1| 2| 3| 4|
    //   | 5| 6| 7| 8| 9|
    // W |10|11|12|13|14| E
    //   |15|16|17|18|19|
    //   |20|21|22|23|24|
    //           S

    const move = action.move
    const game = state.get('game')
    const players = state.get('players')
    const playerIndex = players.indexOf(action.player)

    if(typeof move !== 'object') return false
    if(!sides.includes(move.cube)) return false
    if(!directions.includes(move.direction)) return false
    if(forbidden[move.direction].includes(move.cube)) return false
    if(game.get(move.cube) !== null && game.get(move.cube) !== playerIndex) return false
    return true
}

const computeNextGame = (game, move, index) => {
    let pos
    for(pos=move.cube; !forbidden[move.direction].includes(pos); pos += increments[move.direction]) {
        game = game.set(pos, game.get(pos+increments[move.direction]))
    }
    game = game.set(pos, index)
    return game
}

export const gameReducer = (state, action) => {
    let players
    let playerIndex
    let otherIndex
    let otherPlayer
    
    if(state) {
        players = state.get('players')
        playerIndex = players.indexOf(action.player)
        otherIndex = (playerIndex + 1) % players.count()
        otherPlayer = players.get(otherIndex)
    }
    
    switch(action.type) {
        case 'START_MATCH':
            // game => List of 25 items (None, 0 or 1)
            //      => Values: None, 0 or 1
            //      => 0: first player in players list (X)
            //      => 1: second player in players list (O)
            //
            // | 0| 1| 2| 3| 4|
            // | 5| 6| 7| 8| 9|
            // |10|11|12|13|14|
            // |15|16|17|18|19|
            // |20|21|22|23|24|

            const game = []
            for(let i=0; i<25; i++) game.push(null)
            state = state.set('game', List(game))
            break;

        case 'PLAY_MOVE':
            const nextGame = computeNextGame(state.get('game'), action.move, playerIndex)

            function check(indices) {
                const res = []
                for(const i of indices) {
                    res.push(nextGame.get(i))
                }
                return res.reduce((acc, item) => acc === item && acc !== null ? acc : undefined)
            }

            const checked = lines.map(check)

            let winner = undefined
            if(checked.includes(otherIndex)) {
                winner = otherIndex
            }
            else if(checked.includes(playerIndex)) {
                    winner = playerIndex
            }

            winner = typeof winner === 'number' ? players.get(winner) : winner

            const nextPlayer = winner !== undefined ? undefined : otherPlayer

            state = state
            .set('game', nextGame)
            .set('player', nextPlayer)
            .set('winner', winner)
            break;

        case 'ADD_BAD_MOVE':
            const badMoves = state.get('badMoves').get(action.player)
            state = state
            .set('winner', badMoves > 2 ? otherPlayer : state.get('winner'))
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
            ${range(5).map(line => html`
                <tr>
                    ${range(5).map(column => html`
                        <td style="border: 1px solid black; width: 2em; height: 2em; text-align: center; vertical-align: middle">${display(game.get(line*5+column))}</td>
                    `)}
                </tr>
            `)}
        </table>
        <p>Winner: ${match.get('winner')}</p>
    `
}
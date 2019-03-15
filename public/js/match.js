import { gameReducer, isValidMove, gameOver } from '/games/matches.js'
import { List, Map } from '/modules/immutable/dist/immutable.es.js';
import { addError } from '/js/error.js'

export const playMove = (move) => {
    return {
        type: 'PLAY_MOVE',
        move
    }
}

export const startMatch = (p1, p2) => {
    return {
        type: 'START_MATCH',
        players: [p1, p2]
    }
}

export const requestMove = () => (dispatch, getState) =>{
    const _state = getState().get('match')
    if(_state === null) return

    const state = _state.toJS()
    const player = state.players[state.player]
    const url = `http://${player.ip}:${player.port}/move`

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
    })
    .then(response => response.json())
    .then(move => {
        if(isValidMove(move)) dispatch(playMove(move))
        else dispatch(addError("Invalid Move"))
    })
}

export const matchReducer = (state = null, action) => {
    switch (action.type) {
        case 'START_MATCH':
            if(state === null) {
                return Map({
                    game: gameReducer(),
                    moves: List(),
                    players: List(action.players),
                    player: 0
                })
            }
            return state
        case 'PLAY_MOVE':
            if(state) {
                return Map({
                    game: gameReducer(state.get('game'), action),
                    moves: state.get('moves').push(action.move),
                    players: state.get('players'),
                    player: (state.get('player') + 1) % 2
                })
            }
            return state
    }
}

export const runMatch = (p1, p2) => (dispatch, getState) => {
    const next = () => {
        if(!gameOver(getState().get('match').get('game'))) {
            dispatch(requestMove()).then(next)
        }
    }

    dispatch(startMatch(p1, p2))
    next()
}
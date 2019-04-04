import { gameReducer, isValidMove } from '/games/current.js'
import { List, Map } from '/modules/immutable/dist/immutable.es.js';
import { addError } from '/js/errors.js'
import { addResult } from '/js/matchList.js'

export const playMove = (move, player) => {
    return {
        type: 'PLAY_MOVE',
        move,
        player
    }
}

export const startMatch = (p1, p2) => {
    return {
        type: 'START_MATCH',
        players: [p1, p2]
    }
}

export const clearMatch = () => {
    return {
        type: 'CLEAR_MATCH'
    }
}

export const requestMove = () => (dispatch, getState) =>{
    const _state = getState().get('match')
    const participants = getState().get('participants')
    if(_state === null) return

    const state = _state.toJS()
    const player = participants.get(state.player).toJS()
    const url = `http://${player.ip}:${player.port}/move`

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            game: state.game,
            moves: state.moves,
            players: state.players,
            you: state.player
        })
    })
    .then(response => response.json())
    .then(json => {
        const move = json.move
        const action = playMove(move, state.player)
        if(isValidMove(_state, action)) dispatch(action)
        else throw `Invalid Move: ${JSON.stringify(action)}`
    })
}

export const matchReducer = (state = undefined, action) => {
    switch (action.type) {
        case 'START_MATCH':
            if(state === undefined) {
                state = Map({
                    game: undefined,
                    moves: List(),
                    players: List(action.players),
                    player: action.players[0],
                    winner: undefined
                })
            }
            break;

        case 'PLAY_MOVE':
            if(state) {
                state = Map({
                    game: state.get('game'),
                    moves: state.get('moves').push(Map({move: action.move, player: action.player, gameBefore: state.get('game')})),
                    players: state.get('players'),
                    player: state.get('player'),
                    winner: state.get('winner')
                })
            }
            break;
        
        case 'CLEAR_MATCH':
            state = undefined
            break;
    }
    state = gameReducer(state, action)
    return state
}

export const runMatch = (p1, p2) => (dispatch, getState) => {
    const next = () => {
        const match = getState().get('match')
        if(match.get('winner') === undefined) {
            dispatch(requestMove())
            .then(() => {
                setTimeout(next, 2000)
            })
            .catch(err => {
                console.error(err)
                dispatch(addError(`Request Move Error: ${err}`))
            })
        }
        else {
            dispatch(addResult(match))
            dispatch(clearMatch())
        }
    }
    
    dispatch(startMatch(p1, p2))
    next()
}
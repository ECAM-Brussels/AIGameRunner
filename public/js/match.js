import { gameReducer, isValidMove } from '/games/current.js'
import { List, Map } from '/modules/immutable/dist/immutable.es.js';
import { addError } from '/js/errors.js'
import { addResult } from '/js/matchList.js'
import { fetchTimeout } from '/js/fetchTimeout.js'

export const playMove = (move, player, message) => {
    return {
        type: 'PLAY_MOVE',
        move,
        player,
        message
    }
}

export const addBadMove = (move, player) => {
    return {
        type: 'ADD_BAD_MOVE',
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

    return fetchTimeout(url, {
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
    }, 10000) // 10 secondes
    .then(response => response.json())
    .then(json => {
        const move = json.move
        const message = json.message
        const action = playMove(move, state.player, message)
        if(isValidMove(_state, action)) dispatch(action)
        else throw {error: "Bad Move", action}
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
                    winner: undefined,
                    badMoves: Map(action.players.reduce((res, p) => {res[p]=0; return res;}, {}))
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
                    winner: state.get('winner'),
                    badMoves: state.get('badMoves'),
                    message: action.message ? `${action.player}: ${action.message}` : undefined
                })
            }
            break;

        case 'ADD_BAD_MOVE':
            const badMoves = state.get('badMoves').get(action.player) + 1
            if(state) {
                state = Map({
                    game: state.get('game'),
                    moves: state.get('moves').push(Map({move: action.move, player: action.player, gameBefore: state.get('game'), badMove: true})),
                    players: state.get('players'),
                    player: state.get('player'),
                    winner: state.get('winner'),
                    badMoves: state.get('badMoves').set(action.player, badMoves)
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
                setTimeout(next, 1000)
            })
            .catch(err => {
                console.error(err)
                if(err.error === "Time Out") {
                    dispatch(addBadMove(err.error, match.get('player')))
                }
                else if(err.error === "Bad Move") {
                    dispatch(addBadMove(err.action.move, err.action.player))
                }
                else {
                    dispatch(addError(`Request Move Error: ${err}`))
                    dispatch(addBadMove(err, match.get('player')))
                }
                setTimeout(next, 1000)
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
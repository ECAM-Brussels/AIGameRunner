import { List, Map } from '/modules/immutable/dist/immutable.es.js'

export const matchList = participants => {
    const res = []
    participants = participants.keySeq()
    participants.forEach((p1, i) => {
        participants.slice(0, i).forEach(p2 => {
            res.push(List([p1, p2]).sort())
        })
    });
    return List(res)
}

export const addResult = (players, winner) => {
    winner = players.get(winner)
    players = players.sort()
    const key = players.map(player => player.get('name')).join("<vs>")
    return {
        type: 'ADD_RESULT',
        key,
        winner
    }
}

export const results = (state = Map(), action) => {
    if(action.type === "ADD_RESULT") {
        if(state.has(action.key)) {
            state = state.get(action.key).push(action.winner)
        }
        else {
            state = state.set(action.key, List.of(action.winner))
        }
    }

    return state
}
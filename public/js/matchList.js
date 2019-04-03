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

export const addResult = (match) => {
    match = match.delete('player')
    return {
        type: 'ADD_RESULT',
        match
    }
}

export const results = (state = List(), action) => {
    if(action.type === "ADD_RESULT") {
        state = state.push(action.match)
    }

    return state
}
import { List, Map } from '/modules/immutable/dist/immutable.es.js'

export const matchList = participants => {
    const res = []
    participants = participants.keySeq()
    participants.forEach((p1) => {
        participants.forEach((p2) => {
            if(p1 !== p2) {
                res.push(List([p1, p2]))
            }
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

export const results = (state = Map(), action) => {
    if(action.type === "ADD_RESULT") {
        //state = state.push(action.match)
        state = state.set(action.match.get("players").get(0) + "|" + action.match.get("players").get(1), action.match)
    }

    return state
}
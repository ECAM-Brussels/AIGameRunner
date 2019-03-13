import { List } from '/modules/immutable/dist/immutable.es.js'

export const match = participants => {
    const res = []
    participants = participants.keySeq()
    participants.forEach((p1, i) => {
        participants.slice(0, i).forEach(p2 => {
            res.push(List([p1, p2]).sort())
        })
    });
    return List(res)
}
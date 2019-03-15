const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));  

export const isValidMove = (move, state) => {
    if(move < 1) return false
    if(move > 3) return false
    if(move > state) return false
    return true
}

export const gameReducer = (state, action) => {
    if(state === undefined) {
        state = getRandomInt(5) + 10
    }

    if(action.type === 'PLAY_MOVE') {
        state -= action.move
    }

    return state
}

export const gameOver = (state) => {
    return state === 0
}
const initialState = {
    counter: 1
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([action.text])
        default:
            return state
    }
}
//maintaining the initial state for filters data
const initialState = {
    user: {}
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            console.log('payload', action.payload);
            return {
                ...state,
                user: action.payload
            };

        default:
            return state;
    }
}

export default UserReducer
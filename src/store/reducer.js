
const user = localStorage.getItem('user')

const initState = {
    inforUser: JSON.parse(user),
}

const SET_INFO_USER = 'setUser';
const REMOVE_INFO_USER = 'removeUser';

function reducer(state, action) {
    switch(action.type) {
        case SET_INFO_USER:
            return{
                ...state,
                inforUser: action.payload
            }
        case REMOVE_INFO_USER:
            return{
                ...state,
                inforUser: {}
            }
        default:
            return console.log("Invalid action.")
    }
}

export { initState, reducer};
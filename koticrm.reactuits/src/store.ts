import { legacy_createStore as createStore } from 'redux'
import { RootState } from './models/commonModels/CommonModels';

interface Action {
    type: string;
    [key: string]: any;
}

const initialState:RootState = {
    sidebarShow: true,
}

const changeState = (state = initialState, action: Action) => {
    const { type, ...rest } = action;
    
    switch (type) {
        case 'set':
            return { ...state, ...rest }
        default:
            return state
    }
}

const store = createStore(changeState)
export default store

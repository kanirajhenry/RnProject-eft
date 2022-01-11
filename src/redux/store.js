import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'

import ipReducer from './reducers/ipReducer'
// import { participantReducer } from './reducers/ipReducer'
import * as reducer from './reducers'
import thunk from 'redux-thunk'

export const rootReducer = combineReducers({
    ipReducer: reducer.ipReducer,
    participantReducer: reducer.participantReducer,
    singletonReducer: reducer.singletonReducer
})

const logger = createLogger()

// const rootReducer = (state, action) => appReducers(state, action)
// const rootReducer = appReducers(state, action)

// export const store = createStore(rootReducer)
export const store = createStore(rootReducer, applyMiddleware(thunk, logger))

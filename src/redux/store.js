import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import ipReducer from './reducers/ipReducer'
import thunk from 'redux-thunk'

export const rootReducer = combineReducers({
    ipReducer: ipReducer
})

const logger = createLogger()

// const rootReducer = (state, action) => appReducers(state, action)
// const rootReducer = appReducers(state, action)

// export const store = createStore(rootReducer)
export const store = createStore(rootReducer, applyMiddleware(thunk, logger))

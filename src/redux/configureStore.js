import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Dishes } from './Dishes';
import { Comments } from './Comments';
import { Promotions } from './Promotions';
import { Leaders } from './Leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import {InitialFeedback} from './Form'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            leaders: Leaders,
            promotions: Promotions,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}
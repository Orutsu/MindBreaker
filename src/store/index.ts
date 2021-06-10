import { createStore, combineReducers, Action, applyMiddleware } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';

import { PostsReducer } from './posts';

const rootReducer = combineReducers({
  posts: PostsReducer,
});

const middleware = [thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middleware);

const store = createStore(rootReducer, middlewareEnhancer);

export type AppState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;

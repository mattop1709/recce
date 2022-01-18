import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';

import { rootReducer, rootEpic } from './reducers';

const epicMiddleware = createEpicMiddleware();
const logger = createLogger({ collapsed: true });

export default configStore = () => {
  const store = createStore(
    rootReducer,
    __DEV__
      ? compose(applyMiddleware(epicMiddleware, logger))
      : applyMiddleware(epicMiddleware),
  );

  epicMiddleware.run(rootEpic);

  return store;
};

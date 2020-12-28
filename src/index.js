import blessed            from 'blessed'
import { render }         from 'react-blessed'

import React, {
//  useReducer
}            from 'react'

import { Provider, useSelector, useDispatch }       from 'react-redux/lib/alternate-renderers'

//import devToolsEnhancer from 'remote-redux-devtools'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'


const screen = blessed.screen({
  smartCSR: true,
  title: 'react-blssed redux test'
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

const counter = (state = 0, {type, payload}) => {
  switch(type) {
    case 'inc':
      return state + 1
    case 'dec':
      return state - 1
    case 'reset':
      return 0
    default:
      return state
  }
}
export const store = configureStore({
  reducer: {
    counter,
  },
  middleware: (getDefaultMiddleware) => [],
//  enhancers: [devToolsEnhancer({port: 8999})],
  preloadedState: 0
})

const App = () => {
  const count = useSelector(state => state.counter)
  const dispatch = useDispatch()
//  const [_, forceRerender] = useReducer((s) => s + 1, 0)
  return(
    <box
      width="100%"
      height={12}
      >
      <button
        name="inc"
        onPress={() => {
          dispatch({type: 'inc'});
//          forceRerender()
        }}
        keys
        mouse
        height={3}
        width={9}
      >
        +
      </button>
      <box top={3}>{`count is: ${count}`}</box>
    </box>
  )
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  screen
);


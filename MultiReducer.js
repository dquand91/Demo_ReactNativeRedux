/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createStore, combineReducers} from 'redux';

// State
let appState = {stateValue: 1, stateHistory: [1], stateErrorMessage: ''};

// Action
const _functionAdd = {
  type: 'TYPE_ADD',
  actionValue: 1,
};

const _functionSub = {
  type: 'TYPE_SUB',
  actionValue: 1,
};

// Reducer
const numberReducer = (state = appState, action) => {
  switch (action.type) {
    case 'TYPE_ADD':
      const newValue = state.stateValue + action.actionValue
      state = {
        ...state,
        stateHistory: [...state.stateHistory, newValue],
        stateValue: newValue,
      }
      break;
    case 'TYPE_SUB':
      const newVal = state.stateValue - action.actionValue
      state = {
        ...state,
        stateHistory: [...state.stateHistory, newVal],
        stateValue: newVal,
      }
      break;
  }
  return state;
};



// REDUCER thứ 2
const errorReducer = (state = appState, action) => {
  switch (action.type){
    case 'LESS_THAN_ZERO':
      state = {
        ...state,
        stateErrorMessage: 'The result is less than zero',
      }
      break;
  }
  return state;
};

// Store
// const store = createStore(numberReducer, appState);
const multiReducer = combineReducers({reducer1: numberReducer, reducer2: errorReducer});
// const store = createStore(numberReducer, appState);
const store = createStore(multiReducer);

// Test
store.subscribe(() => {
  console.log('Store updated', store.getState());
});

store.dispatch(_functionAdd); // Output: 2 (ban đầu là 1 + 1 => 2)
store.dispatch(_functionAdd); // Output: 3
store.dispatch(_functionAdd); // Output: 4
store.dispatch(_functionSub); // Output: 3

store.dispatch({type: 'LESS_THAN_ZERO'});

export default class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
        <Text>Demo</Text>
      </View>
    );
  }
}
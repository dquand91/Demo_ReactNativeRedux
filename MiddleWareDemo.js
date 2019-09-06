/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';

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

// MiddleWare nằm trước reducer
// Mục đích:  để xử lý logic trước khi chạy reducer
// Khi mình gọi dispatch bất kỳ action nào
// ==> nó sẽ chạy vào Middleware trước
// ==> rồi mới chạy reducer.


// Cấu trúc chỗ này hơi lạ tí
// Ý nghĩa: đầu tiên truyền store vào function thứ 1, 
//   store chạy xong truyền 1 cái next qua function thứ 2, 
//   next chạy xong truyền 1 cái action qua function thứ 3.
//   Ở function thứ 3, mình sử dụng được hết cả 3 biến store, next, action
const xulyMiddleWare1 = store => next => action => {
    next(action);
};

// Bài toán ví dụ:
// Khi gọi bất kỳ action 
// ==> vào middle kiểm tra xem nhỏ hay lớn hơn 0
// ==> Nhỏ thì chạy action LESS_THAN_ZERO
// ==> Lớn thì chạy action truyền vào.
const xulyMiddleWare2 = store => next => action => {

    const currentNumber = store.getState().reducer1.stateValue;

    if (currentNumber <= 0){
        // Không thoả điều kiền nên sẽ chạy action LESS_THAN_ZERO
        next({type: 'LESS_THAN_ZERO'});
    } else {
        // Thoả điều kiền, nên chạy cái action được truyền vào.
        next(action);
    }

    console.log('currentNumber ', currentNumber);
};

// Store
const multiReducer = combineReducers({reducer1: numberReducer, reducer2: errorReducer});
const store = createStore(multiReducer, applyMiddleware(xulyMiddleWare1, xulyMiddleWare2));

// Test
store.subscribe(() => {
  console.log('Store updated', store.getState());
});

store.dispatch(_functionAdd); // Output: 2 (ban đầu là 1 + 1 => 2)
store.dispatch(_functionSub); // Output: 1
store.dispatch(_functionSub); // Output: 0 , The result is less than zero
store.dispatch(_functionSub); // Output: 0 , The result is less than zero
store.dispatch(_functionAdd); // Output: 1 , 
store.dispatch(_functionSub); // Output: 0 , The result is less than zero

export default class App3 extends Component {
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
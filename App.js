/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createStore} from 'redux';

// State
// Tự tạo thêm 1 cái mảng chứa history của state
// Mảng ban đầu có 1 phần tử với giá trị là 1
let appState = {stateValue: 1, stateHistory: [1]};

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
const numberReducer = (state, action) => {
  switch (action.type) {
    case 'TYPE_ADD':
      // CÁCH mutable state
      // state.stateValue += action.actionValue;
      //---------------------------
      // CÁCH immutable state
      // Để lấy lại được các state cũ lun
      // ...state có nghĩa là giữ lại các state cũ
      const newValue = state.stateValue + action.actionValue
      state = {
        ...state,
        // Ở đây mình sẽ update cái stateHistory
        // với: ...state.stateHistory là giữ lại các phần tử đã có trong mảng
        // và thêm 1 phần tử mới newValue vào
        stateHistory: [...state.stateHistory, newValue],
        // Cách cũ tương đương với câu lệnh: 
        // state.stateValue = state.stateValue + action.actionValue
        // Cách cũ:
        //stateValue: state.stateValue + action.actionValue
        // Cách mới: 
        stateValue: newValue,
      }
      break;
    case 'TYPE_SUB':
      // CÁCH mutable state
      // state.stateValue -= action.actionValue;
      //---------------------------
      // CÁCH immutable state
      // Để lấy lại được các state cũ lun
      // ...state có nghĩa là giữ lại các state cũ
      const newVal = state.stateValue - action.actionValue
      state = {
        ...state,
        // Ở đây mình sẽ update cái stateHistory
        // với: ...state.stateHistory là giữ lại các phần tử đã có trong mảng
        // và thêm 1 phần tử mới newValue vào
        stateHistory: [...state.stateHistory, newVal],
        // Cách cũ tương đương với câu lệnh:
        // state.stateValue = state.stateValue + action.actionValue
        // Cách cũ:
        //stateValue: state.stateValue + action.actionValue
        // Cách mới:
        stateValue: newVal,
      }
      break;
  }
  return state;
};



// REDUCER thứ 2
const errorReducer = (state, action) => {
  switch(action.type){
    case 'LESS_THAN_ZERO':
      state={
        
      }
  }
}

// Store
const store = createStore(numberReducer, appState);

// Test
store.subscribe(() => {
  // Để đăng ký lắng nghe state thay đổi
  // Mỗi khi state thay đổi sẽ vô đây
  console.log('Store updated', store.getState());
});

// Cách Action dạng biến
// MỖI LẦN GỌI DISPATCH callback subcribe sẽ được gọi.
store.dispatch(_functionAdd); // Output: 2 (ban đầu là 1 + 1 => 2)
store.dispatch(_functionAdd); // Output: 3
store.dispatch(_functionAdd); // Output: 4
store.dispatch(_functionSub); // Output: 3

// Cách Action dạng anonymous
// Mình sử dụng lại action type cũ 'TYPE_ADD' và thay đổi giá trị truyền vào.
// Mình tạo ra 1 anonymous object
store.dispatch({
  type: 'TYPE_ADD',
  actionValue: 8,
}); // Output: 11

// Cách Action dạng 1 anonymous function return kiểu trả về là 1 action
const hamCreateActionAdd = (inputNumber) => {
  return {type: 'TYPE_ADD', actionValue: inputNumber};
};
store.dispatch(hamCreateActionAdd(5)); // Output: 16

export default class App extends Component {
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
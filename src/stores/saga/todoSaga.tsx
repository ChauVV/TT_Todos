import {put, takeLatest, fork, select} from 'redux-saga/effects';

import CONSTS from 'store/storeHelper/constants';

// Sort array object
const sortArray = (arr: object[]): object[] => {
  let temp = arr.sort((a, b) => {
    return b.priority - a.priority;
  });
  return temp;
};

export function* addTodo(obj: any) {
  const {payload = {}} = obj;
  try {
    const todos = yield select(t => t.todoStore.todos);

    let temp = [payload, ...todos];
    // sort
    temp = sortArray(temp);

    yield put({
      type: CONSTS.ADD_TODO_SUCCESS,
      payload: temp,
    });
  } catch (err) {
    yield put({
      type: CONSTS.ADD_TODO_FAIL,
    });
  }
}

export function* editTodo(obj: any) {
  const {payload = {}} = obj;
  try {
    const todos = yield select(t => t.todoStore.todos);
    let temp = [...todos];
    temp?.map(td => {
      if (payload?.id === td.id) {
        td.title = payload.title;
        td.priority = payload.priority;
        td.from = payload.from;
        td.to = payload.to;
      }
    });
    // sort
    temp = sortArray(temp);

    yield put({
      type: CONSTS.EDIT_TODO_SUCCESS,
      payload: temp,
    });
  } catch (err) {
    yield put({
      type: CONSTS.EDIT_TODO_FAIL,
    });
  }
}

export function* deleteTodo(obj: any) {
  const {payload = {}} = obj;
  try {
    const todos = yield select(t => t.todoStore.todos);
    let temp = [...todos];
    temp = todos.filter((td: any) => td.id !== payload.id);

    yield put({
      type: CONSTS.DELETE_TODO_SUCCESS,
      payload: temp,
    });
  } catch (err) {
    yield put({
      type: CONSTS.DELETE_TODO_FAIL,
    });
  }
}

function* watchProduct() {
  yield takeLatest(CONSTS.ADD_TODO, addTodo);
  yield takeLatest(CONSTS.EDIT_TODO, editTodo);
  yield takeLatest(CONSTS.DELETE_TODO, deleteTodo);
}

export default function* rootChild() {
  yield fork(watchProduct);
}

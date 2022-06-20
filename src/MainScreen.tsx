/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList, Alert} from 'react-native';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import REDUX_CONSTS from 'store/storeHelper/constants';
import moment from 'moment';

import TodoItem from 'components/TodoItem';
import FABGroup from 'components/FABGroup';
import ModalAdd from 'components/ModalAdd';

interface MainScreenProps {
  todos: any;
  addTodo: Function;
  editTodo: Function;
  deleteTodo: Function;
}

const MainScreen = ({
  todos,
  addTodo,
  editTodo,
  deleteTodo,
}: MainScreenProps) => {
  const [selected, setSelected] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [passed, setPassed] = useState<any[]>([]);

  useEffect(() => {
    let arrPassed: any[] = [];

    todos.map((td: any) => {
      if (Number(td.to) < moment().unix()) {
        arrPassed.push(td);
      }
    });

    setPassed(arrPassed);
  }, [todos]);

  const openAddModal = () => {
    setModalVisible(true);
  };

  const openEditModal = () => {
    setModalVisible(true);
  };

  const clickDelete = () => {
    Alert.alert('Warning', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          const _td = {...selected};

          deleteTodo(_td);

          setSelected(null);
        },
      },
    ]);
  };

  const _addTodo = (td: any) => {
    const _td = {...td};
    setModalVisible(false);
    setSelected(null);

    setTimeout(() => {
      addTodo(_td);
    }, 0);
  };

  const _editTOdo = (td: any) => {
    const _td = {...td};
    setModalVisible(false);
    setSelected(null);

    setTimeout(() => {
      editTodo(_td);
    }, 0);
  };

  return (
    <SafeAreaViewS>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Container>
        <Title>Todo List</Title>
        <CategoryContainer>
          <CategoryTitle>CATEGORIES</CategoryTitle>
          <Category>
            <CategoryContent>
              <CCCounterTasks>{`${todos.length} tasks`}</CCCounterTasks>
              <CCTitle left={true}>TODO</CCTitle>
            </CategoryContent>
            <CategoryContent>
              <CCCounterTasks>{`${passed.length} tasks`}</CCCounterTasks>
              <CCTitle left={false}>PASSED</CCTitle>
            </CategoryContent>
          </Category>
        </CategoryContainer>
        <ListTaskContainer>
          <CategoryTitle>LIST TASKS</CategoryTitle>
          <FlatList
            data={todos}
            keyExtractor={item => item?.id?.toString()}
            renderItem={({item}) => (
              <TodoItem
                item={item}
                selected={selected}
                setSelected={setSelected}
              />
            )}
          />
        </ListTaskContainer>
        <FABGroup
          selected={selected}
          clickAdd={openAddModal}
          clickEdit={openEditModal}
          clickDelete={clickDelete}
        />
        <ModalAdd
          selected={selected}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          add={_addTodo}
          edit={_editTOdo}
        />
      </Container>
    </SafeAreaViewS>
  );
};

const mapStateToProps = (state: any) => {
  return {
    todos: state.todoStore.todos,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addTodo: (payload: any) =>
      dispatch({
        type: REDUX_CONSTS.ADD_TODO,
        payload,
      }),
    editTodo: (payload: any) =>
      dispatch({
        type: REDUX_CONSTS.EDIT_TODO,
        payload,
      }),
    deleteTodo: (payload: any) =>
      dispatch({
        type: REDUX_CONSTS.DELETE_TODO,
        payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

const ListTaskContainer = styled.View``;
const CCTitle = styled.Text`
 font-size: 22px;
 font-weight: bold;
 color: ${({left}: any) => (left ? 'red' : 'green')}
 align-self: center;
 margin-top: 11px;
 `;
const CCCounterTasks = styled.Text`
  font-size: 14px;
  color: gray;
  margin-top: 10px;
  margin-left: 10px;
`;
const CategoryContent = styled.View`
  width: 43%;
  height: 100px;
  background-color: white;
  border-radius: 5px;
`;
const CategoryTitle = styled.Text`
  font-size: 14px;
  color: gray;
  font-weight: bold;
  margin-top: 30px;
  margin-left: 20px;
`;
const CategoryContainer = styled.View``;
const Category = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 10px;
  padding-horizontal: 30px;
`;
const Title = styled.Text`
  font-size: 40px;
  color: black;
  font-weight: bold;
  margin-top: 30px;
  margin-left: 20px;
`;
const Container = styled.View`
  flex: 1;
  background-color: #f2f2f2;
`;
const SafeAreaViewS = styled.SafeAreaView`
  flex: 1;
  background-color: #f2f2f2;
`;

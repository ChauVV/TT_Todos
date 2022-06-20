import React, {useEffect, useState} from 'react';
import {Keyboard, TextInput, Modal, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {Icon} from '@rneui/themed';
import {MotiView, useAnimationState} from 'moti';
import {MotiPressable} from 'moti/interactions';
import {CheckBox} from '@rneui/themed';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {addTodo} from 'src/stores/saga/todoSaga';

const HightColor = '#f700be';
const MediumColor = '#0000ff';
const LowColor = '#ada5ab';

enum PRIORITIES {
  HIGHT = 3,
  MEDIUM = 2,
  LOW = 1,
}

interface ModalAddProps {
  selected: any;
  modalVisible: boolean;
  setModalVisible: Function;
  add: Function;
  edit: Function;
}

const ModalAdd = ({
  selected,
  modalVisible,
  setModalVisible,
  add,
  edit,
}: ModalAddProps) => {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState(PRIORITIES.LOW);
  const [isPickFrom, setPickFrom] = useState(false);
  const [isPickTo, setPickTo] = useState(false);
  const [from, setFrom] = useState(moment(moment()).unix().toString());
  const [to, setTo] = useState(
    moment(moment().add(1, 'day')).unix().toString(),
  );

  const checkBoxStyle = {
    color: 'gray',
  };

  const setAllPriority = (r: PRIORITIES) => {
    Keyboard.dismiss();
    setPriority(r);
  };

  useEffect(() => {
    if (selected) {
      setNewTask(selected?.title);
      setPriority(selected?.priority);
      setFrom(selected?.from);
      setTo(selected?.to);
    }
  }, [selected]);

  const _addTodo = () => {
    Keyboard.dismiss();
    const td = {
      id: new Date().getTime().toString(),
      title: newTask,
      priority: priority,
      from: from,
      to: to,
    };

    setNewTask('');
    setPriority(PRIORITIES.LOW);
    setFrom(moment(moment()).unix().toString());
    setTo(moment(moment().add(1, 'day')).unix().toString());

    add(td);
  };

  const _editTodo = () => {
    Keyboard.dismiss();
    const td = {
      id: selected?.id || new Date().getTime().toString(),
      title: newTask,
      priority: priority,
      from: from,
      to: to,
    };

    setNewTask('');
    setPriority(PRIORITIES.LOW);
    setFrom(moment(moment()).unix().toString());
    setTo(moment(moment().add(1, 'day')).unix().toString());
    edit(td);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <Container delay={200} visible={modalVisible} activeOpacity={1}>
        <DismissView onPress={() => setModalVisible(false)} />
        <Content>
          <Input
            value={newTask}
            onChangeText={t => setNewTask(t)}
            placeholder="Enter new task"
          />
          <RiorityView>
            <MSTitle>Riority: </MSTitle>
            <RadioGroup>
              <CheckBox
                title={'LOW'}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={priority === PRIORITIES.LOW}
                checkedColor={LowColor}
                uncheckedColor={LowColor}
                onPress={() => setAllPriority(PRIORITIES.LOW)}
                textStyle={checkBoxStyle}
              />
              <CheckBox
                title={'MEDIUM'}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={priority === PRIORITIES.MEDIUM}
                checkedColor={MediumColor}
                uncheckedColor={MediumColor}
                onPress={() => setAllPriority(PRIORITIES.MEDIUM)}
                textStyle={checkBoxStyle}
              />
              <CheckBox
                title={'HIGHT'}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={priority === PRIORITIES.HIGHT}
                checkedColor={HightColor}
                uncheckedColor={HightColor}
                onPress={() => setAllPriority(PRIORITIES.HIGHT)}
                textStyle={checkBoxStyle}
              />
            </RadioGroup>
          </RiorityView>
          <RiorityView>
            <DateView>
              <MSTitle>From: </MSTitle>
              <MSValue1
                onPress={() => {
                  Keyboard.dismiss();
                  setPickFrom(true);
                }}>
                {moment.unix(Number(from)).format('hh:mm - DD/MM/YYYY')}
              </MSValue1>
            </DateView>
            <DateView>
              <MSTitle>{'     To: '}</MSTitle>
              <MSValue2
                onPress={() => {
                  Keyboard.dismiss();
                  setPickTo(true);
                }}>
                {moment.unix(Number(to)).format('hh:mm - DD/MM/YYYY')}
              </MSValue2>
            </DateView>
          </RiorityView>
          <BtnAdd
            disabled={newTask.length === 0}
            onPress={selected ? _editTodo : _addTodo}>
            <TextAdd>{selected ? 'Edit task' : 'Add New Task'}</TextAdd>
          </BtnAdd>
        </Content>
        <DateTimePickerModal
          isVisible={isPickFrom}
          mode="datetime"
          onConfirm={pr => {
            setPickFrom(false);
            setFrom(moment(moment(pr)).unix().toString());
          }}
          onCancel={() => {
            setPickFrom(false);
          }}
        />
        <DateTimePickerModal
          isVisible={isPickTo}
          mode="datetime"
          onConfirm={pr => {
            setPickTo(false);
            setTo(moment(moment(pr)).unix().toString());
          }}
          onCancel={() => {
            setPickTo(false);
          }}
        />
      </Container>
    </Modal>
  );
};

export default ModalAdd;

const TextAdd = styled.Text`
  font-size: 15px;
  color: white;
  font-weight: bold;
`;
const BtnAdd = styled.TouchableOpacity`
  opacity: ${({disabled}: any) => (disabled ? 0.5 : 1)};
  padding-horizontal: 25px;
  padding-vertical: 15px;
  border-radius: 22px;
  background-color: #944dff;
  justify-content: center;
  align-items: center;
  width: 50%;
  bottom: 50px;
  position: absolute;
  right: 30px;
  margin-top: 120px;
`;
const DateView = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;
const RadioGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const MSValue2 = styled.Text`
  font-size: 15px;
  color: lightblue;
  font-weight: bold;
  margin-left: 10px;
  border-bottom-width: 1px;
  border-color: lightblue;
`;
const MSValue1 = styled.Text`
  font-size: 15px;
  color: lightgreen;
  font-weight: bold;
  margin-left: 10px;
  border-bottom-width: 1px;
  border-color: lightgreen;
`;
const MSTitle = styled.Text`
  font-size: 20px;
  color: gray;
  font-weight: bold;
`;
const RiorityView = styled.View`
  flex-direction: column;
  padding-horizontal: 20px;
  margin-bottom: 20px;
`;
const Input = styled.TextInput`
  font-size: 30px;
  color: black;
  margin-top: 40px;
  margin-left: 20px;
  padding-right: 20px;
`;
const DismissView = styled.TouchableOpacity`
  flex: 1;
`;
const Container = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  background-color: 'rgba(0,0,0,0.3)';
`;
const Content = styled.View`
  height: 80%;
  background-color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

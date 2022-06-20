import React from 'react';
import styled from 'styled-components/native';
import {CheckBox} from '@rneui/themed';
import moment from 'moment';
import {Icon} from '@rneui/themed';

const HightColor = '#f700be';
const MediumColor = '#0000ff';
const LowColor = '#ada5ab';

enum PRIORITIES {
  HIGHT = 3,
  MEDIUM = 2,
  LOW = 1,
}

const TodoItem = ({item, selected, setSelected}: any) => {
  const color =
    item?.priority === PRIORITIES.HIGHT
      ? HightColor
      : item?.priority === PRIORITIES.MEDIUM
      ? MediumColor
      : LowColor;

  const passed = Number(item?.to) < moment().unix();

  return (
    <TodoItemContainer
      activeOpacity={0.6}
      onPress={() => setSelected(selected === item ? null : item)}>
      {passed && selected !== item ? (
        <PassedIcon
          name={'checkmark-circle-outline'}
          size={25}
          color={color}
          type={'ionicon'}
        />
      ) : (
        <CheckBox
          disabled={true}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={selected?.id === item?.id}
          checkedColor={color}
          uncheckedColor={color}
        />
      )}
      <Title passed={passed} lineNumber={1}>
        {item?.title}
      </Title>
      {!passed && (
        <ToTimeView>
          <ToTime>
            {moment.unix(Number(item?.to)).format('hh:mm - DD/MM/YYYY')}
          </ToTime>
        </ToTimeView>
      )}
    </TodoItemContainer>
  );
};

export default TodoItem;

const ToTime = styled.Text`
  font-size: 10px;
  width: 100%;
  color: lightgray;
`;
const ToTimeView = styled.View`
  width: 100px;
  height: 100%;
  flex-direction: column;
  padding: 5px;
`;
const PassedIcon = styled(Icon)`
  margin-horizontal: 19px;
`;
const Title = styled.Text`
  color: ${({passed}: any) => (passed ? 'lightgreen' : 'gray')};
  text-decoration-line: ${({passed}: any) =>
    passed ? 'line-through' : 'none'};
  font-size: 15px;
  flex: 1;
`;
const TodoItemContainer = styled.TouchableOpacity`
  height: 55px;
  background-color: white;
  margin-top: 10px;
  margin-horizontal: 30px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
`;

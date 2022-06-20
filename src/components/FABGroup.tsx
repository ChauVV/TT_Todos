import React from 'react';
import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {Icon} from '@rneui/themed';

interface IFABGroup {
  selected: any;
  clickAdd: Function;
  clickEdit: Function;
  clickDelete: Function;
}

interface IFAB {
  color?: string;
  icon: string;
  size?: number;
  action: Function;
}

const FAB = ({color, icon, size, action}: IFAB) => {
  return (
    <FABContainer color={color} onPress={action}>
      <Icon name={icon} size={size || 20} color={'white'} type={'ionicon'} />
    </FABContainer>
  );
};

const FABGroup = ({selected, clickAdd, clickEdit, clickDelete}: IFABGroup) => {
  return (
    <View style={styles.container}>
      {selected ? (
        <>
          <FAB color={'#f700be'} icon={'trash-outline'} action={clickDelete} />
          <FAB color={'blue'} icon={'create-outline'} action={clickEdit} />
        </>
      ) : (
        <FAB icon={'add-outline'} size={35} action={clickAdd} />
      )}
    </View>
  );
};

export default FABGroup;

const FABContainer = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-top: 10px;
  background-color: ${({color}: any) => color || 'green'};
  align-items: center;
  justify-content: center;
`;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    flexDirection: 'column',
  },
});

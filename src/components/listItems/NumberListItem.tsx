import React, { useState, StatelessComponent } from 'react';
import { View, Text } from 'react-native';
import { Slider } from 'react-native-elements';
import { ListItemProps } from '../../types';

const NumberListItem: StatelessComponent<ListItemProps<number>> = ({
  id,
  label,
  value = 0,
  onChange,
}) => {
  const [state, setState] = useState({ value });

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: '200', color: 'white' }}>
        {label}
      </Text>
      <Slider
        style={{ width: 200 }}
        minimumValue={0}
        maximumValue={50}
        step={10}
        onValueChange={newValue => {
          setState({ value: newValue });
          if (onChange) {
            onChange(id, newValue);
          }
        }}
        value={state.value}
      />
    </View>
  );
};

export default React.memo(NumberListItem);

import React, { useState, StatelessComponent } from 'react';
import { View, Text, Switch } from 'react-native';
import { ListItemProps } from '../../types';

const BooleanListItem: StatelessComponent<ListItemProps<boolean>> = ({
  id,
  label,
  value = false,
  onChange,
}) => {
  const [state, setState] = useState({ checked: value });

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

      <Switch
        value={state.checked}
        onValueChange={newVal => {
          if (onChange) {
            onChange(id, newVal);
          }
          setState({ checked: newVal });
        }}
      />
    </View>
  );
};

export default React.memo(BooleanListItem);

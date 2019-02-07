import React from 'react';
import { Icon } from 'expo';

export default (props) => (
  <Icon.MaterialCommunityIcons
    name={props.name}
    size={26}
    style={{ marginBottom: -3 }}
    color={'black'}
  />
);
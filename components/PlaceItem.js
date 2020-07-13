import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from "react-native-elements";
import Colors from '../constants/Colors';

const PlaceItem = props => {
  return (
    <ListItem
      title={props.title}
      subtitle={props.address}
      leftAvatar={{
        source: props.image && { uri: props.image }
      }}
      onPress={props.onSelect}
      bottomDivider
      chevron
    />
  );
};

const styles = StyleSheet.create({
});

export default PlaceItem;

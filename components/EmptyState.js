import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from "react-native-elements";
import Colors from '../constants/Colors';

const EmptyState = ({ iconName, iconSize, text }) => {
    return (
        <View style={styles.empty}>
            <Icon
                name={iconName}
                size={iconSize ? iconSize : 60}
                color={Colors.grey300}
            />
            <Text style={styles.emptyText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    empty: {
        marginVertical: 15
    },
    emptyText: {
        color: Colors.grey300
    },
});

export default EmptyState;

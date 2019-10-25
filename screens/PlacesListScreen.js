import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector } from "react-redux";

import PlaceItem from "../components/PlaceItem";

const PlacesListScreen = props => {
    const places = useSelector(state => state.places.places)
    return (
        <FlatList data={places} keyExtractor={item => item.id} renderItem={itemData => <PlaceItem image={null} title={itemData.item.title} adress={null} onSelect={() => {
            props.navigation.navigate('PlaceDetail', { placeTitle: itemData.item.title, placeId: itemData.item.id })
        }} />} />
    )
}

PlacesListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All places',
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Add place'
                style={styles.icon}
                iconName='add'
                onPress={() => {
                    navData.navigation.navigate('NewPlace')
                }}
            />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    icon: {
        paddingHorizontal: 20
    }
})

export default PlacesListScreen;
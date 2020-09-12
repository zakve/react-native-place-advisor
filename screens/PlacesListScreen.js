import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import MapScreen from './MapScreen';


import PlaceItem from "../components/PlaceItem";
import * as placesActions from "../store/places-actions";

const PlacesListScreen = props => {
    const dispatch = useDispatch()
    const places = useSelector(state => state.places.places)

    useEffect(() => {
        dispatch(placesActions.loadPlaces())
    }, [dispatch])

    return (
        <View>
            <FlatList
                data={places}
                keyExtractor={item => item.id}
                renderItem={itemData =>
                    <PlaceItem
                        image={itemData.item.imageUri}
                        title={itemData.item.title}
                        address={`Lat ${itemData.item.lat}, Lng ${itemData.item.lng}`}
                        onSelect={() => {
                            props.navigation.navigate('PlaceDetail', { placeTitle: itemData.item.title, placeId: itemData.item.id })
                        }}
                    />}
            />
        </View>
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
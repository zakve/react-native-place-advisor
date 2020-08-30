import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from "react-native";
import { Input, Button } from 'react-native-elements';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

import { useDispatch } from "react-redux";
import * as placesActions from "../store/places-actions";
import Colors from '../constants/Colors';

// components
import EmptyState from '../components/EmptyState'
import ImagePick from "../components/ImagePick";
import LocationPick from '../components/LocationPick';

const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState('');
    const [pickedImage, setPickedImage] = useState('');
    const [pickedLocation, setPickedLocation] = useState('');

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        // add validation
        setTitleValue(text);
    }

    const dispatchPlace = useCallback(() => {
        dispatch(placesActions.addPlace(titleValue, pickedImage));
        props.navigation.goBack();
    }, [titleValue])

    useEffect(() => {
        props.navigation.setParams({ submitPlace: dispatchPlace })
    }, [dispatchPlace])



    return (
        <ScrollView>
            <ImagePick
                pickedImage={pickedImage}
                setPickedImage={image => setPickedImage(image)}
            />
            <View style={styles.form}>
                <Input
                    placeholder='Place name'
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                    inputContainerStyle={styles.placeNameContainer}
                    inputStyle={styles.placeName}
                />
                <LocationPick
                    pickedLocation={pickedLocation}
                    setPickedLocation={location => setPickedLocation(location)}
                />
            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = navData => {
    const submitPlace = navData.navigation.getParam('submitPlace');

    return {
        headerTitle: 'Add place',
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Save place'
                style={styles.headerIcon}
                iconName='check'
                onPress={submitPlace}
            />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    form: {
        marginHorizontal: 30
    },
    placeNameContainer: {
        borderBottomWidth: 0,
        marginVertical: 10,
        marginBottom: 30
    },
    placeName: {
        fontSize: 28
    },
    headerIcon: {
        paddingHorizontal: 20
    }
})

export default NewPlaceScreen;
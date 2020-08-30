import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from "react-native";
import { Input, Button, Text, Icon } from 'react-native-elements';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import { useDispatch } from "react-redux";
import * as placesActions from "../store/places-actions";
import Colors from '../constants/Colors';

// components
import EmptyState from '../components/EmptyState'
import ImagePick from "../components/ImagePick";

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

    const locationHandler = location => {
        check(PERMISSIONS.IOS.LOCATION_ALWAYS)
            .then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log(
                            'This feature is not available (on this device / in this context)',
                        );
                        break;
                    case RESULTS.DENIED:
                        console.log(
                            'The permission has not been requested / is denied but requestable',
                        );
                        request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
                            console.log('request location')
                            console.log(result)
                        });
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch((error) => {
                // …
            });
        console.log('location pick')
    }

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
                <View style={styles.locationPicker}>
                    <EmptyState iconName='place' iconSize={50} text='No location picked yet.' />
                    <Button
                        title={pickedImage ? 'Change location' : 'Pick location'}
                        titleStyle={styles.btn}
                        buttonStyle={styles.buttonContainer}
                        type='outline'
                        onPress={locationHandler}
                    />
                </View>
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

    locationPicker: {
        width: '100%',
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.grey50
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
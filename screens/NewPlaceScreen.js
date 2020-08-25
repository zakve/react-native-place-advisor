import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { Input, Button, Text, Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import { useDispatch } from "react-redux";
import * as placesActions from "../store/places-actions";
import Colors from '../constants/Colors';

// components
import EmptyState from '../components/EmptyState'

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

    const takePictureHandler = picture => {
        // More info on all the options is below in the API Reference... just some common use cases shown here
        const options = {
            title: 'Select Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setPickedImage(response.uri)
            }
        });
    }

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
            <View style={styles.imagePicker}>
                {
                    !pickedImage ?
                        <EmptyState iconName='landscape' text='No image picked yet.' />
                        :
                        <ImageBackground source={{ uri: pickedImage }} style={styles.image} />
                }
                <Button
                    title={pickedImage ? 'Change picture' : 'Take picture'}
                    titleStyle={styles.btn}
                    buttonStyle={styles.buttonContainer}
                    type='outline'
                    onPress={takePictureHandler}
                />
            </View>
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
    imagePicker: {
        width: '100%',
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: Colors.grey50
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
    btn: {
        color: Colors.primary,
    },
    buttonContainer: {
        borderColor: Colors.primary
    },
    image: {
        flex: 1,
        width: '100%',
        height: 300
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
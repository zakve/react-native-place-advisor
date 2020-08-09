import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { Input, Button, Text, Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

import { useDispatch } from "react-redux";
import * as placesActions from "../store/places-actions";
import Colors from '../constants/Colors';

// import ImagePicker from "../components/ImagePicker";

const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState('');
    const [pickedImage, setPickedImage] = useState('');

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


    const emptyState = <View style={styles.empty}>
        <Icon
            name='landscape'
            size={60}
            color={Colors.grey300}
        />
        <Text style={styles.emptyText}>No image picked yet.</Text>
    </View>

    return (
        <ScrollView>
            <View style={styles.imagePicker}>
                {
                    !pickedImage ?
                        emptyState
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
    empty: {
        marginVertical: 15
    },
    emptyText: {
        color: Colors.grey300
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
        marginVertical: 10
    },
    placeName: {
        fontSize: 28
    },
    headerIcon: {
        paddingHorizontal: 20
    }
})

export default NewPlaceScreen;
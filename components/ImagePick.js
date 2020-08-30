import React, { useState } from 'react';
import { View, StyleSheet, Platform, Alert, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';

// Components
import EmptyState from "../components/EmptyState";

// Constants
import Colors from '../constants/Colors';


const ImagePick = ({ pickedImage, setPickedImage }) => {

    const verifyPermissions = async () => {
        try {
            let result;
            if (Platform.OS === 'android') {
                result = await check(PERMISSIONS.ANDROID.CAMERA)
            } else if (Platform.OS === 'ios') {
                result = await check(PERMISSIONS.IOS.CAMERA)
            }
            //console.log(result)
            if (result != 'granted') {
                const req = await requestPermissions();

                if (!req) {
                    Alert.alert(
                        'Insufficient permissions!',
                        'You need to grant camera permissions to use this app.',
                        [{ text: 'Okay' }]
                    );
                }
                return false
            }
            return true;
        } catch (error) {
            console.log(`Permission image picker error: ${error}`)
            Alert.alert(
                'Permission image picker error',
                error,
                [{ text: 'Okay' }]
            )
        };
    }

    const requestPermissions = async () => {
        try {
            let req;
            if (Platform.OS === 'android') {
                req = await request(PERMISSIONS.ANDROID.CAMERA)
            } else if (Platform.OS === 'ios') {
                req = await request(PERMISSIONS.IOS.CAMERA)
            }
            if (req != 'granted') {
                Alert.alert(
                    'Request camera permissions failed!',
                    'Request camera permissions failed! Try add permissions from settings.',
                    [{ text: 'Okay' }]
                );
                return false
            }
            return true;

        } catch (error) {
            console.log(`REQUEST Permission image picker error: ${error}`)
            Alert.alert(
                'REQUEST Permission image picker error',
                error,
                [{ text: 'Okay' }]
            )
        }
    }

    const takePictureHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

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

    return (
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
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        width: '100%',
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
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
});

export default ImagePick;

import React, { useState } from 'react';
import { View, StyleSheet, Platform, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

// Components
import EmptyState from "./EmptyState";
import MapPreview from "./MapPreview";

// Constants
import Colors from '../constants/Colors';


const LocationPick = ({ pickedLocation, setPickedLocation }) => {
    const [isLoading, setIsLoading] = useState(false)

    const verifyPermissions = async () => {
        try {
            let result;
            if (Platform.OS === 'android') {
                result = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
            } else if (Platform.OS === 'ios') {
                result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            }

            switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log(
                        'This feature is not available (on this device / in this context)',
                    );
                    Alert.alert(
                        'Location is not available!',
                        'This feature is not available (on this device / in this context).',
                        [{ text: 'Okay' }]
                    );
                    return false;
                case RESULTS.DENIED:
                    console.log(
                        'The permission has not been requested / is denied but requestable',
                    );
                    const req = await requestPermissions();
                    return req;
                    break;
                case RESULTS.GRANTED:
                    console.log('The permission is granted');
                    return true;
                    break;
                case RESULTS.BLOCKED:
                    console.log('The permission is denied and not requestable anymore');
                    Alert.alert(
                        'Location Permission blocked!',
                        'The permission is denied and not requestable anymore.',
                        [{ text: 'Okay' }]
                    );
                    return false;
                    break;

                    return true;
            }
        } catch (error) {
            console.log(`Permission location picker error: ${error}`)
            Alert.alert(
                'Permission location picker error',
                error,
                [{ text: 'Okay' }]
            )
        };
    }

    const requestPermissions = async () => {
        try {
            let req;
            if (Platform.OS === 'android') {
                req = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
            } else if (Platform.OS === 'ios') {
                req = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            }
            if (req != 'granted') {
                Alert.alert(
                    'Request location permissions failed!',
                    'Request location permissions failed! Try add permissions from settings.',
                    [{ text: 'Okay' }]
                );
                return false
            }
            return true;

        } catch (error) {
            console.log(`REQUEST Permission location picker error: ${error}`)
            Alert.alert(
                'REQUEST Permission location picker error',
                error,
                [{ text: 'Okay' }]
            )
        }
    }

    const locationHandler = async () => {
        setIsLoading(true)
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        const location = await Geolocation.getCurrentPosition(
            (position) => {
                setPickedLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
                setIsLoading(false)
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
                setIsLoading(false)
            },
            { enableHighAccuracy: false, timeout: 5000 }
        );
    }

    return (
        <View style={styles.locationPicker}>
            <View>
                <MapPreview location={pickedLocation}>
                    {
                        isLoading ?
                            <ActivityIndicator />
                            :
                            <EmptyState iconName='place' iconSize={50} text='No location picked yet.' />
                    }
                </MapPreview>
                <Button
                    title={pickedLocation ? 'Change location' : 'Pick location'}
                    titleStyle={styles.btn}
                    buttonStyle={styles.buttonContainer}
                    type='outline'
                    onPress={locationHandler}
                />
            </View>
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
    locationPicker: {
        width: '100%',
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.grey50
    },
});

export default LocationPick;

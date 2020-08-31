import React from 'react';
import { Image, StyleSheet, View, ImageBackground } from 'react-native';
import { GOOGLE_API_KEY } from '@env'

const MapPreview = (props) => {
    let imagePreviewUrl;

    if (props.location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng},NY&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${GOOGLE_API_KEY}`
        console.log(imagePreviewUrl)
    }

    return <View>
        {
            props.location ? <ImageBackground style={styles.mapImage} source={{ uri: imagePreviewUrl }} /> : props.children
        }
    </View>
}

const styles = StyleSheet.create({
    mapImage: {
        width: '100%',
        height: '100%'
    }
})

export default MapPreview;
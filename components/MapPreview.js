import React from 'react';
import { Image, StyleSheet } from 'react-native';

const MapPreview = ({ location }) => {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng},NY&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=YOUR_API_KEY`
}



export default MapPreview;
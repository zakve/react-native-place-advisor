import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const ImagePicker = props => {
    const takeImageHandler = () => { };

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                <Text>No image picked yet.</Text>
                <Image style={styles.img} />
            </View>
            <Button
                title="Take Image"
                color={Colors.primary}
                onPress={() => { takeImageHandler }} />
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default ImagePicker;
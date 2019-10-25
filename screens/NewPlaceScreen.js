import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from "react-native";
import { Input, Button, Text } from 'react-native-elements';

import { useDispatch } from "react-redux";
import * as placesActions from "../store/places-actions";

const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState('');

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        // add validation
        setTitleValue(text);
    }

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue));
        props.navigation.goBack();
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                    label='Add new place'
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <Button
                    title="Save place"
                    style={styles.btn}
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add place'
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    btn: {
        marginVertical: 20
    }
})

export default NewPlaceScreen;
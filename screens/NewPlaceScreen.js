import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from "react-native";
import { Input, Button, Text } from 'react-native-elements';

const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState('');

    const titleChangeHandler = text => {
        // add validation
        setTitleValue(text);
    }

    const savePlaceHandler = () => {

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
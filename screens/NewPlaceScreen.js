import React from 'react';
import { View, StyleSheet, ScrollView } from "react-native";
import { Input, Button, Text } from 'react-native-elements';

const NewPlaceScreen = props => {
    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                    label='Add new place'
                />
                <Button
                    title="Save place"
                    style={styles.btn}
                    onPress={() => { }}
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
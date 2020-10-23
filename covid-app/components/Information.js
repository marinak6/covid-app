import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

class Information extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.screen}>
                <Text>Information screen</Text>
            </View>
        )
    }
}
export default Information

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: "100%",
        width: "100%",
        flexDirection: 'column',

    },
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
});
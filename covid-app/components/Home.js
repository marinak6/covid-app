import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

class Home extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.screen}>
                <Text>Homescreen</Text>
            </View>
        )
    }
}
export default Home

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
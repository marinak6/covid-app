import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text, Dimensions } from 'react-native'

class Home extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.container}>
                    <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@100&display=swap" rel="stylesheet"></link>
                    <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@100&display=swap" rel="stylesheet"></link>
                    <Text style={styles.welcomeTitle}>COVID Sense</Text>
                    <Text style={styles.subtitle}> Helping you understand trends of COVID-19 in your area.</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Search')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View >
            </View>
        )
    }
}
export default Home

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        display: 'flex',
        width: "100%",
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'start',
        alignItems: 'center',

    },
    welcomeTitle: {
        fontFamily: 'Libre Franklin',
        fontSize: 70,
        // fontWeight: 'bold',
        marginTop: 0,
        height: 'auto',
    },
    subtitle: {
        marginTop: 20,
        fontFamily: 'Libre Franklin',
        fontSize: 25,
    },
    container: {
        display: 'flex',
        width: "100%",
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        marginTop: "10%"

    },
    button: {
        margin: 10,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#3aba8f',
        borderColor: '#3aba8f',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 50,
        width: 200
    },
    buttonText: {
        fontFamily: 'Libre Franklin',
        color: 'white',
        fontSize: 30
    },
    buttonContainer: {
        alignItems: 'center', // center buttons within container 
        marginTop: 30
    },
});
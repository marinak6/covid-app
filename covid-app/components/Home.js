import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text, Dimensions } from 'react-native'

class Home extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcomeTitle}>COVID Sense</Text>
                <Text style={styles.subtitle}> Helping you understand trends of COVID-19 in your area.</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Search')}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View >
        )
    }
}
export default Home
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: "100%",
        width: "100%",
        flexDirection: 'column',

    },
    welcomeTitle: {
        fontFamily: 'Metropolis-Thin.otf',
        fontSize: 70,
        fontWeight: 'bold',
        marginTop: -100
    },
    subtitle: {
        fontFamily: 'Metropolis-Thin.otf',
        fontSize: 30,
    },
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
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
        fontFamily: 'Metropolis-Thin.otf',
        color: 'white',
        fontSize: 30
    },
    buttonContainer: {
        alignItems: 'center', // center buttons within container 
        marginTop: 30
    },
});
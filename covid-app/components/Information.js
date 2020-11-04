import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Paragraph } from 'react-native-paper';

class Information extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.screen}>
                <Text style={styles.titleText}>FAQ</Text>
                <View style={styles.section}>
                    <Text style={styles.infoTitle}>Infections Model</Text>
                    <View style={styles.faq}>
                        <Text style={styles.question}> What's the accuracy for the model? </Text>
                        <Paragraph> 87% </Paragraph>
                    </View>
                    <View style={styles.faq}>
                        <Text style={styles.question}> What model are you using? </Text>
                        <Paragraph> ARIMA </Paragraph>
                    </View>
                    <View style={styles.faq}>
                        <Text style={styles.question}> What's a confidence interval? </Text>
                        <Paragraph> </Paragraph>
                    </View>
                    <View style={styles.faq}>
                        <Text style={styles.question}> Where did you get your data for COVID-19 infections</Text>
                        <Paragraph> </Paragraph>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.infoTitle}>Twitter Analysis</Text>
                    <View style={styles.faq}>
                        <Text style={styles.question}> What's the accuracy for the model? </Text>
                        <Paragraph> 89%</Paragraph>
                    </View>
                    <View style={styles.faq}>
                        <Text style={styles.question}> What model are you using? </Text>
                        <Paragraph> Logistic Regression</Paragraph>
                    </View>
                    <View style={styles.faq}>
                        <Text style={styles.question}> How did you get the tweets?</Text>
                        <Paragraph> </Paragraph>
                    </View>
                    <View style={styles.faq}>
                        <Text style={styles.question}> Is the tweet sentiment analysis indicative of the area selected? </Text>
                        <Paragraph> </Paragraph>
                    </View>

                </View>
            </View>
        )
    }
}
export default Information

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        display: 'flex',
        width: "100%",
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',

    },
    section: {

    },
    titleText: {
        fontFamily: 'Avenir',
        fontSize: 50,
        fontWeight: 'bold',
    },
    infoTitle: {
        fontFamily: 'Avenir',
        fontSize: 27,
        color: "#3aba8f"
    },
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    question: {

    },
    faq: {

    }
});
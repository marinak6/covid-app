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
                <View style={styles.faqsection}>
                    <Text style={styles.titleText}>FAQ</Text>
                    <View style={styles.section}>
                        <Text style={styles.infoTitle}>Infections Model</Text>
                        <View style={styles.faq}>
                            <Text style={styles.question}> What's the accuracy for the model? </Text>
                            <Paragraph>     • 87% </Paragraph>
                        </View>
                        <View style={styles.faq}>
                            <Text style={styles.question}> What model are you using? </Text>
                            <Paragraph>     • ARIMA </Paragraph>
                        </View>
                        <View style={styles.faq}>
                            <Text style={styles.question}> What's a confidence interval? </Text>
                            <Paragraph>     • </Paragraph>
                        </View>
                        <View style={styles.faq}>
                            <Text style={styles.question}> Where did you get your data for COVID-19 infections</Text>
                            <Paragraph>     • </Paragraph>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.infoTitle}>Twitter Analysis</Text>
                        <View style={styles.faq}>
                            <Text style={styles.question}> What's the accuracy for the model? </Text>
                            <Paragraph>     • 89%</Paragraph>
                        </View>
                        <View style={styles.faq}>
                            <Text style={styles.question}> What model are you using? </Text>
                            <Paragraph>     • Logistic Regression</Paragraph>
                        </View>
                        <View style={styles.faq}>
                            <Text style={styles.question}> How did you get the tweets?</Text>
                            <Paragraph>     • </Paragraph>
                        </View>
                        <View style={styles.faq}>
                            <Text style={styles.question}> Is the tweet sentiment analysis indicative of the area selected? </Text>
                            <Paragraph>     • </Paragraph>
                        </View>

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
    faqsection: {
        display: 'flex',
        width: "60%",
        height: "100%",
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        display: 'flex',
        width: "50%",
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'start',
        marginBottom: '3%'
    },
    titleText: {
        fontFamily: 'Avenir',
        fontSize: 60,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: '2%',
        marginTop: "3%"
    },
    infoTitle: {
        fontFamily: 'Avenir',
        fontSize: 30,
        color: "#3aba8f",
        alignSelf: 'center',
        marginBottom: '3%'
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
        display: 'flex',
        marginTop: "2%"
    }
});
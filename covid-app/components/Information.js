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
                <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@100&display=swap" rel="stylesheet"></link>
                <View style={styles.faqsection}>
                    <Text style={styles.titleText}>FAQ</Text>
                    <View style={styles.section}>
                        <Text style={styles.infoTitle}>Infections Model</Text>
                        <View style={styles.faq}>
                            <Text style={styles.question}> What's the accuracy for the model? </Text>
                            <Paragraph style={styles.answer}>• Each county has it's own model. The average accuracy is 87%. </Paragraph>
                        </View>
                        <View style={styles.faq}>
                            <Text style={styles.question}> What model are you using? </Text>
                            <Paragraph style={styles.answer}>• We are using Auto Regressive Integrated Moving Average (ARIMA). This is a statistical model that makes predictions based solely on previous values. Learn more about it <Text style={styles.link} onPress={() => Linking.openURL("https://www.machinelearningplus.com/time-series/arima-model-time-series-forecasting-python/#:~:text=ARIMA%2C%20short%20for%20'Auto%20Regressive,used%20to%20forecast%20future%20values")}>here</Text>!</Paragraph>
                        </View>
                        <View style={styles.faq}>
                            <Text style={styles.question}> What's a confidence interval? </Text>
                            <Paragraph style={styles.answer}>• Our graphs show a 95% confidence interval. Essentially, the true value of the number of total COVID-19 cases will fall within that range 95% of the time.</Paragraph>
                        </View>
                        <View style={styles.faq}>
                            <Text style={styles.question}> Where did you get your data for COVID-19 infections</Text>
                            <Paragraph style={styles.answer}>• We are using the New York Times COVID-19 dataset. Check it out <Text style={styles.link} onPress={() => Linking.openURL("https://github.com/nytimes/covid-19-data")}>here</Text>!</Paragraph>

                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.infoTitle}>Twitter Analysis</Text>
                        <View style={styles.faq}>
                            <Text style={styles.question}> What's the accuracy for the model? </Text>
                            <Paragraph style={styles.answer}>• The model has a validation accuracy of 89%</Paragraph>
                        </View>
                        <View style={styles.faq}>
                            <Text style={styles.question}> What model are you using? </Text>
                            <Paragraph style={styles.answer}>• Logistic Regression</Paragraph>
                        </View>
                        <View style={styles.faq}>
                            <Text style={styles.question}> How did you get the tweets?</Text>
                            <Paragraph style={styles.answer}>• The tweets used to train our model were collected through the Twitter API based on a collection of hashtags we determined would be indicative of a tweet's stance on supporting or not supporting guidelines. The tweets used to create the statistics seen on the search page are based on geo-tagged, COVID-19 related tweet IDs collected by Rabindra Lamsal, a researcher at the School of Computer and Systems Sciences, JNU, New Delhi. These tweet ids were then rehydrated with the Twitter API. The tweet ids can be found <Text style={styles.link} onPress={() => Linking.openURL("https://ieee-dataport.org/open-access/coronavirus-covid-19-geo-tagged-tweets-dataset")}>here</Text>!</Paragraph>

                        </View>
                        <View style={styles.faq}>
                            <Text style={styles.question}> Is the tweet sentiment analysis indicative of the area selected? </Text>
                            <Paragraph style={styles.answer}>• The results of the tweet analysis cannot be applied to the county in general. This is because only tweets were considered, which is not a true representative sample of the population.</Paragraph>
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
        width: "90%",
        height: "100%",
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    answer: {
        marginLeft: 25,
        fontFamily: 'Libre Franklin',
    },
    section: {
        display: 'flex',
        width: "60%",
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'start',
        marginBottom: '3%'
    },
    titleText: {
        fontFamily: 'Libre Franklin',
        fontSize: 60,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: '2%',
        marginTop: "3%"
    },
    infoTitle: {
        fontFamily: 'Libre Franklin',
        fontSize: 30,
        color: "#3aba8f",
        alignSelf: 'center',
        marginBottom: '3%'
    },
    link: {
        fontFamily: 'Libre Franklin',
        color: "#3aba8f",
        textDecorationLine: 'underline'
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
        fontFamily: 'Libre Franklin',
        fontWeight: 'bold'
    },
    faq: {
        display: 'flex',
        marginTop: "2%"
    }
});
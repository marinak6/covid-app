import React from 'react'
import { Text, Image, View, Button, StyleSheet, TouchableOpacity } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';


const countyData = require('../fips_codes.json');
const countyStats = require('../county_stats.json');
const stateStats = require('../state_stats.json');

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            query: "",
            madeSelection: false,
            fips: "",
            display: false,
            source: "",
            enoughCountyData: false
        }
    }

    componentDidMount() {
        this.setState({
            countyData: countyData
        })
    }

    findCounty(query) {
        if (query === '') {
            return [];
        }

        const { countyData } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return countyData.filter(county => county.text.search(regex) >= 0);
    }

    onSelect(item) {
        console.log(item)
        console.log(item.text)
        this.setState({
            query: item.text,
            madeSelection: true,
            fips: item.fips
        })
        console.log(this.state)
    }

    renderItem = ({ item, i, separators }) => {
        return (
            <TouchableOpacity key={i} onPress={() => this.onSelect(item)}>
                <Text>
                    {item.text}
                </Text>
            </TouchableOpacity>
        )
    }

    returnQuery() {
        return this.state['query']
    }


    changeSelection() {
        console.log('reset state')
        this.setState({
            query: "",
            madeSelection: false,
            display: false,
            source: ""
        })
    }

    displayThings() {
        const { fips } = this.state
        const data = countyStats[fips]

        const source = require("../prediction_graphs/" + fips + ".png")
        this.setState({
            source: source,
            display: true,
            enoughCountyData: data['count'] >= 100
        })
    }

    getNegative() {
        const { fips } = this.state
        const { enoughCountyData } = this.state
        var stateFips = String(fips).substring(0, 2)
        var data = ""
        if (enoughCountyData) {
            data = countyStats[fips]
        }
        else {
            data = stateStats[stateFips]
        }
        const string = "" + Math.round((100 * data['negative'] / data['count']))
        return string + "%"
    }
    getPositive() {
        const { fips } = this.state
        const { enoughCountyData } = this.state
        var stateFips = String(fips).substring(0, 2)
        var data = ""
        if (enoughCountyData) {
            data = countyStats[fips]
        }
        else {
            data = stateStats[stateFips]
        }
        const string = "" + Math.round((100 * data['positive'] / data['count']))
        return string + "%"
    }
    getNeutral() {
        const { fips } = this.state
        const { enoughCountyData } = this.state
        var stateFips = String(fips).substring(0, 2)
        var data = ""
        if (enoughCountyData) {
            data = countyStats[fips]
        }
        else {
            data = stateStats[stateFips]
        }
        const string = "" + Math.round((100 * data['neutral'] / data['count']))
        return string + "%"
    }

    render() {
        const { query } = this.state;
        const { madeSelection } = this.state;
        const { enoughCountyData } = this.state;
        const { source } = this.state;
        const { display } = this.state;
        console.log(query)
        const counties = this.findCounty(query);
        console.log(counties)
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        const data = counties.length === 1 && comp(query, counties[0].text) ? [] : counties
        const { countyData } = this.state;
        console.log(data)
        return (
            <View style={styles.screen}>
                {!madeSelection && !display && <Text style={[styles.titleText, { marginTop: "10%" }]}> Analyze COVID-19 trends of U.S. County</Text>}
                {madeSelection && !display && <Text style={styles.titleText}> Analyze COVID-19 trends of U.S. County</Text>}

                {!madeSelection && <View style={styles.container}>
                    {!madeSelection && <Autocomplete
                        autoCapitalize="none"
                        containerStyle={styles.autocompleteContainer}
                        flatListProps={{ nestedScrollEnabled: true, }}
                        inputContainerStyle={styles.autocompleteInput}
                        listStyle={styles.listContainer}
                        style={styles.autocompleteStyle}
                        autoCorrect={false}
                        data={data}
                        defaultValue={query}
                        onChangeText={text => this.setState({ query: text })}
                        placeholder="Enter U.S. county"
                        renderItem={({ item, i, separators }) => (
                            <TouchableOpacity key={i} onPress={() => this.onSelect(item)}>
                                <Text style={{ fontFamily: 'Avenir Next', fontSize: 20 }}>
                                    {item.text}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />}
                </View>}


                {(madeSelection && !display) &&
                    <View style={styles.container2}>
                        <Text style={[styles.infoTitle, { fontSize: 35, marginBottom: "3%" }]}> Selected {query} </Text>
                        <View style={styles.buttonsDisplay}>
                            <TouchableOpacity
                                onPress={this.changeSelection.bind(this)}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Change selection</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.displayThings.bind(this)}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Get info</Text>
                            </TouchableOpacity>
                        </View>
                    </View>}


                {display &&
                    <View style={styles.infoScreen}>
                        <center>
                            <View style={[styles.sideBySide, { paddingBottom: "3%" }]}>
                                <Text style={{
                                    fontFamily: 'Avenir',
                                    fontSize: 40,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    marginRight: "2%"
                                }}>{query}</Text>
                                <TouchableOpacity
                                    onPress={this.changeSelection.bind(this)}
                                    style={[styles.button, { margin: 0 }]}
                                >
                                    <Text style={[styles.buttonText]}>Change selection</Text>
                                </TouchableOpacity>
                            </View>
                        </center>
                        <View style={styles.model}>

                            <Text style={[styles.infoTitle]}>Cummulative Cases Predictions</Text>

                            <View style={[styles.sideBySide, { marginTop: 0 }]}>
                                <Image
                                    style={styles.stretch}
                                    source={source}
                                />
                            </View>

                        </View>
                        <View style={[styles.model, { marginTop: "2%", marginBottom: "3%" }]}>

                            <Text style={[styles.infoTitle, { marginTop: "1%" }]}> Twitter Sentiment regarding Support of COVID-19 Guidelines</Text>
                            {!enoughCountyData && <Text style={{ fontFamily: 'Avenir', fontSize: 16 }}>Displaying statewide data, not enought data for {query}</Text>}
                            <View style={styles.sideBySide2}>
                                <View style={[styles.tweetBox, { marginRight: "5%", marginLeft: "10%" }]}>
                                    <Text style={[styles.tweetText, { color: 'green' }]}> Support</Text>
                                    <Text> {this.getPositive()}</Text>

                                </View>
                                <View style={[styles.tweetBox, { marginRight: "5%" }]}>
                                    <Text style={[styles.tweetText, { color: 'red' }]}> Do not support</Text>
                                    <Text> {this.getNegative()}</Text>
                                </View>
                                <View style={[styles.tweetBox, { marginRight: "10%" }]}>
                                    <Text style={[styles.tweetText, { color: 'grey' }]}> Unclear support</Text>
                                    <Text> {this.getNeutral()}</Text>

                                </View>

                            </View>
                        </View>

                    </View>
                }
            </View>
        )
    }
}
export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: '-25%'
    },
    autocompleteStyle: {
        borderColor: '#3aba8f',
        borderWidth: 2,
        borderRadius: 4,
        padding: 10,
        backgroundColor: 'white',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        width: 300,
        maxWidth: 300,
        selectionColor: '#3aba8f'
    },
    subtitle: {
        fontFamily: 'Avenir Next',
        fontSize: 35,
    },
    autocompleteInput: {
        width: 300,
        maxWidth: 300,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Avenir',
        selectionColor: '#3aba8f'
    },
    titleText: {
        fontFamily: 'Avenir',
        fontSize: 50,
        fontWeight: 'bold',
    },
    buttonsDisplay: {
        flex: 1,
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sideBySide: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
        width: "100%"
        // justifyContent: 'left' //'space-between'
    },
    sideBySide2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        width: "60%",
        marginTop: "2%",
        paddingTop: "1%",
        paddingBottom: "1%"
    },
    tweetText: {
        fontFamily: 'Avenir',
        fontSize: 20,

    },
    tweetBox: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    statsBox: {
        height: 300,
        width: 300,
        borderColor: "grey",
        borderWidth: 5,
        margin: 10
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    button: {
        margin: 10,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#3aba8f',
        borderColor: '#3aba8f',
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
        textAlign: 'center',
        marginBottom: "10%"
    },
    buttonText: {
        fontFamily: 'Avenir Next',
        color: 'white',
        fontSize: 20
    },
    container2: {
        display: 'flex',
        width: "100%",
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "5%"
    },
    stretch: {
        // paddingTop: "35.7142857%",
        width: 840,
        height: 300,
        margin: 0,
        resizeMode: 'stretch',
    },
    screen: {
        flex: 1,
        display: 'flex',
        width: "100%",
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    model: {
        display: 'flex',
        width: "100%",
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoScreen: {
        width: "100%",
        display: 'flex',
        marginTop: "2%",
        marginBottom: "2%"
    },
    infoTitle: {
        fontFamily: 'Avenir Next',
        fontSize: 27,
        textAlign: 'center',
        color: "#3aba8f"
    },
    autocompleteContainer: {
        position: 'absolute',
        fontSize: 20,
        width: 300,
        maxWidth: 300
    },
    listContainer: {
        position: 'absolute',
        maxHeight: 300,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        width: 300,
        padding: 5,
        maxWidth: 300
    },

});
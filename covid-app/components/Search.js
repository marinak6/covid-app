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
        const string = "negative count: " + data['negative']
        return string
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
        const string = "positive count: " + data['positive']
        return string
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
        const string = "neutral count: " + data['neutral']
        return string
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
                <Text style={styles.titleText}> Analyze COVID-19 trends of U.S. County</Text>
                <View style={styles.container}>
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
                </View>

                {madeSelection &&
                    <Text style={styles.subtitle}> Selected {query} </Text>}


                {(madeSelection && !display) && <View style={styles.buttonsDisplay}>
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
                </View>}


                {display &&
                    <View style={{ margin: 10, padding: 0 }}>

                        <Text style={styles.titleText}> {query} Cummulative Cases Predictions</Text>

                        <View style={styles.sideBySide}>
                            <Image
                                style={styles.stretch}
                                source={source}
                            />
                            <View style={styles.statsBox}>
                                <Text style={styles.titleText}> maybe put some stats here</Text>
                            </View>
                        </View>

                        <Text style={styles.titleText}> {query} Twitter Sentiment</Text>
                        {!enoughCountyData && <Text style={{ margin: 10 }}>Displaying statewide data, not enought data for {query}</Text>}

                        <View style={styles.sideBySide}>
                            <View style={styles.negative}>
                                <Text style={styles.titleText}>{this.getNegative()}</Text>
                            </View>
                            <View style={styles.neutral}>
                                <Text style={styles.titleText}>{this.getNeutral()}</Text>
                            </View>
                            <View style={styles.positive}>
                                <Text style={styles.titleText}>{this.getPositive()}</Text>
                            </View>

                        </View>
                        <TouchableOpacity
                            onPress={this.changeSelection.bind(this)}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Change selection</Text>
                        </TouchableOpacity>

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
        marginTop: "10%"
    },
    buttonsDisplay: {
        flex: 1,
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sideBySide: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // justifyContent: 'left' //'space-between'
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
    },
    buttonText: {
        fontFamily: 'Avenir Next',
        color: 'white',
        fontSize: 20
    },
    buttonContainer: {
        alignItems: 'center', // center buttons within container 
    },
    stretch: {
        // paddingTop: "35.7142857%",
        width: 840,
        height: 300,
        margin: 10,
        resizeMode: 'stretch',
    },
    screen: {
        flex: 1,
        display: 'flex',
        height: "100%",
        width: "100%",
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
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
    negative: {
        margin: 10,
        fontSize: 20,
        width: 200,
        height: 200,
        fontWeight: "bold",
        borderColor: "red",
        borderWidth: 5,
        backgroundColor: "#ffcccb",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    neutral: {
        margin: 10,
        fontSize: 20,
        width: 200,
        height: 200,
        fontWeight: "bold",
        borderColor: "grey",
        borderWidth: 5,
        backgroundColor: "#d7d7d7",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    positive: {
        margin: 10,
        fontSize: 20,
        width: 200,
        height: 200,
        fontWeight: "bold",
        borderColor: "green",
        borderWidth: 5,
        backgroundColor: "#b2ff59",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
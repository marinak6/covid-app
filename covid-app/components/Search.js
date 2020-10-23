import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';

const countyData = [
    { fips: 123, text: "Prince William" },
    { fips: 124, text: "Albemarle" },
    { fips: 125, text: "Prince george" },
    { fips: 126, text: "Gainesville" },
    { fips: 127, text: "Justin Beiber" },
    { fips: 128, text: "idk" },
]
class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            query: "",
            countyData: [{ fips: 123, text: "Prince William" },
            { fips: 124, text: "Albemarle" },
            { fips: 125, text: "Prince george" },
            { fips: 126, text: "Gainesville" },
            { fips: 127, text: "Justin Beiber" },
            { fips: 128, text: "idk" }]

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

    render() {
        const { query } = this.state;
        const counties = this.findCounty(query);
        console.log(counties)
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        const data = counties.length === 1 && comp(query, counties[0].text) ? [] : counties
        console.log(data)
        return (
            <View style={styles.screen}>
                <Text>Search screen</Text>
                <Autocomplete
                    autoCapitalize="none"
                    containerStyle={styles.autocompleteContainer}
                    autoCorrect={false}
                    data={data}
                    defaultValue={query}
                    onChangeText={text => this.setState({ query: text })}
                    placeholder="Enter U.S. county"
                    renderItem={({ item, i, separators }) => (
                        <TouchableOpacity key={i} onPress={() => this.onSelect(item)}>
                            <Text>
                                {item.text}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }
}
export default Search

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
    },
    autocompleteContainer: {
        marginLeft: 10,
        marginRight: 10
    },
});
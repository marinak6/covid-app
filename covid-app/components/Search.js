import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
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
            countyData: []

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

    render() {
        const { query } = this.state;
        const counties = this.findCounty(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        return (
            <View style={styles.screen}>
                <Text>Search screen</Text>
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    data={counties.length === 1 && comp(query, counties[0].text) ? [] : counties}
                    defaultValue={query}
                    onChangeText={text => this.setState({ query: text })}
                    placeholder="Enter U.S. county"
                    renderItem={({ item, i }) => (
                        <TouchableOpacity onPress={() => this.setState({ query: item })}>
                            <Text>
                                {item}
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
    }
});
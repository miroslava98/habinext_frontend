import React, { useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { color, defaultTheme, SearchBar } from "@rneui/base";
import { DefaultTheme } from "@react-navigation/native";


const SearchBarComponent: React.FC = () => {

    const [search, setSearch] = useState("");

    const updateSearch = (text: string): string => {
        setSearch(text);
        Alert.alert("You are searching ", text);

        return text;
    };

    return (
        <View style={styles.view}>
            <SearchBar style={styles.searchBar}
                platform="default" 
                lightTheme 
                round
                containerStyle={{ backgroundColor: '#A4B7A4' }}
                inputContainerStyle={{ backgroundColor: 'white' }}
                placeholder="Busca una localización, propiedad..."
                onChangeText={setSearch} 
                
                
                
                >

            </SearchBar>
        </View>
    );



};


const styles = StyleSheet.create({
    view: {
        width: "100%",
        padding: 10,
    },
    searchBar: {
        backgroundColor: 'white',
        color: 'black'
    }
});


export default SearchBarComponent;

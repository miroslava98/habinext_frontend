import { Header, Icon } from "@rneui/base";
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";


const HeaderComp = () => {

    return (

        <Header backgroundColor="#5E6E5E"
            leftComponent={{
                icon: 'menu',
                color: '#fff',
            }}
            rightComponent={
                <View style={styles.headerRight}>
                    <TouchableOpacity>
                        <Icon name="description" color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                    >
                        <Icon type="antdesign" name="rocket1" color="white" />
                    </TouchableOpacity>
                </View>
            }
            centerComponent={{ text: 'HabiNext', style: styles.heading }}
        />

    );
};

export default HeaderComp;


const styles = StyleSheet.create({


    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    }


});



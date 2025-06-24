import Login from "@/app/login";
import { Header, Icon } from "@rneui/base";
import { router, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";


const HeaderComp = () => {

    const router = useRouter();

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
                        style={{ marginLeft: 10 }} onPress={() => router.push("/login")}>
                        <Icon type="login" name="login" color="white" />
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



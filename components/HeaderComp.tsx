import React, { useState } from "react";
import { Header, Icon } from "@rneui/base";
import { useRouter } from "expo-router";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import ProfileMenuButton from "./ProfileMenuButton";

import { useAuth } from "@/src/context/authcontext";

const HeaderComp = () => {

    const router = useRouter();
    const { userToken, logout } = useAuth();
    const [profileMenuVisible, setProfileMenuVisible] = useState(false);



    const handlePress = async () => {
        if (userToken) {
            setProfileMenuVisible(true);
        } else {
            router.push("/login");
        }
    };


    return (

        <><Header backgroundColor="#5E6E5E"
            leftComponent={{
                icon: 'menu',
                color: '#fff',
            }}
            rightComponent={<View style={styles.headerRight}>
                <TouchableOpacity>
                    <Icon name="description" color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginLeft: 10 }} onPress={handlePress}>
                    <Icon
                        type="material"
                        name={userToken ? "logout" : "login"}
                        color="white" />
                </TouchableOpacity>
            </View>}
            centerComponent={{ text: 'HabiNext', style: styles.heading }} />
            <>
                <ProfileMenuButton visible={profileMenuVisible} onClose={() => setProfileMenuVisible(false)} />

            </>
        </>
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





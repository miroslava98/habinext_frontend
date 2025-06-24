import React from "react";
import { Button, StyleSheet, Platform, Image, View } from "react-native";
import { Card, Icon, Text } from '@rneui/base';



const PropertyCard = () => {

    return (
        <Card containerStyle={styles.container}>
            <Image
                source={require("../assets/images/imagen_piso.jpg")}
                style={styles.image}
                resizeMode="cover"
            />
            <Card.FeaturedSubtitle style={styles.title}>Piso en C/ Maestro Serrano 4</Card.FeaturedSubtitle>

            <Card.FeaturedSubtitle>
                60.000 €
            </Card.FeaturedSubtitle>
            <Card.Divider />

            <View style={styles.card_details} >
            <Icon  name="bathtub"></Icon><Text style={styles.text_item}>1 baño</Text>
            <Icon  name="expand"></Icon><Text style={styles.text_item}>107m2</Text>
            <Icon  name="stairs"></Icon><Text style={styles.text_item}>1ª planta</Text>
            <Icon  name="bedroom-parent"></Icon><Text style={styles.text_item}>1 hab</Text>
            </View>


            <Card.Divider />

            <View style={styles.card_details} >
                <Icon style={styles.details_seller} name="person"></Icon>
                <Text style={styles.text_item}>Vendedor particular</Text>

            </View>
            
        </Card>
    );
};




const styles = StyleSheet.create({
    container: {
        width: 'auto',
        height: 'auto',
        flex: 1,
        backgroundColor: '#7c907c',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    title: {
        color: 'white',
        marginBottom: 10,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
    },
    card_details: {
        display: 'flex',
        flexDirection: 'row',
    },
    text_item: {
        color: 'white',
        marginRight: 10,
        textAlignVertical: 'top'

    },
    details_seller: {
        fontSize: 30,

    }
});

export default PropertyCard;
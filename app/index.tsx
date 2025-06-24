import React from "react";
import PropertyCard from "@/components/PropertyCard";
import { Text, View, StyleSheet, Platform, FlatList, useWindowDimensions, ScrollView } from "react-native";
import SearchBarComponent from "@/components/SearchBar";
import { Button } from "@rneui/base";
import HeaderComp from "@/components/HeaderComp";


const miLista = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
  { id: '7' },
  { id: '8' },
  { id: '9' },
  { id: '10' },
];



export default function Index() {
  const { width } = useWindowDimensions();

  const isMobileSize = width < 768;

  return (
    <>
      <HeaderComp />
      <SearchBarComponent />

      <ScrollView horizontal style={styles.scrollButtonsContainer}>
        <View style={styles.buttonsContainer}>
          <Button
            title="Filtros ()"
            buttonStyle={{
              borderColor: 'black',
              borderRadius: 10,
            }}
            type="outline"
            titleStyle={{ color: 'black' }}
            containerStyle={{
              width: 100,
              marginHorizontal: 5,
              marginVertical: 10,
            }}
          />
          <Button
            title="Población"
            buttonStyle={{
              borderColor: 'black',
              borderRadius: 10,

            }}
            type="outline"
            titleStyle={{ color: 'black' }}
            containerStyle={{
              width: 100,
              marginHorizontal: 5,
              marginVertical: 10,
            }}

          />

          <Button
            title="Precio"
            buttonStyle={{
              borderColor: 'black',
              borderRadius: 10,

            }}
            type="outline"
            titleStyle={{ color: 'black' }}
            containerStyle={{
              width: 100,
              marginHorizontal: 5,
              marginVertical: 10,
            }}

          />
          <Button
            title="Habitaciones"
            buttonStyle={{
              borderColor: 'black',
              borderRadius: 10,


            }}
            type="outline"
            titleStyle={{ color: 'black' }}
            containerStyle={{
              width: 100,
              marginHorizontal: 5,
              marginVertical: 10,
            }}

          />

          <Button
            title="Extras"
            buttonStyle={{
              borderColor: 'black',
              borderRadius: 10,

            }}
            type="outline"
            titleStyle={{ color: 'black' }}
            containerStyle={{
              width: 100,
              marginHorizontal: 5,
              marginVertical: 10,
            }}

          />

        </View>
      </ScrollView>
      {Platform.OS === 'web' ? (
        <><Text style={styles.subtitle}>Estás en la versión web 🖥️</Text>

          <FlatList
            data={miLista}
            numColumns={isMobileSize ? 1 : 3}
            key={isMobileSize ? 'mobile' : 'web'}
            keyExtractor={item => item.id}
            renderItem={() => (
              <View style={styles.item}>
                <PropertyCard />
              </View>
            )}
            contentContainerStyle={styles.container}
          >


          </FlatList>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>Estás en la versión móvil 📱</Text>
          <FlatList
            data={miLista}
            numColumns={1}
            keyExtractor={item => item.id}
            renderItem={() => (
              <View style={styles.item}>
                <PropertyCard />
              </View>
            )}
            contentContainerStyle={styles.container}
          >


          </FlatList>
        </>

      )}

      <Button title="Ir a funcionalidades" onPress={() => alert('Vamos allá 🚀')} />
    </>

  );
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  item: {
    flex: 1,
    margin: 6,

  },
  scrollButtonsContainer: {
    padding: 2,
    height: 500,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    marginVertical: 5,
  }
});

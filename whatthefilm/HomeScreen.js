import {  useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableHighlight, Modal, SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import axios from "axios";

export default function HomeScreen({ navigation }) {

const apiurl = "https://www.omdbapi.com/?apikey=e6612bd6";
const [state, setState] = useState({
s: "Search",
results: [],
selected: {}
});


const search = () => {
axios(apiurl + "&s=" + state.s).then(({ data }) => {
  let results = data.Search
  setState(prevState => {
    return { ...prevState, results: results }

  })
})
}

const openPopup = id => {
  axios(apiurl + "&i=" + id).then(({ data }) => {
  let result = data;
  setState(prevState => {
    return { ...prevState, selected: result}
  });
});
}


return (
    <View style={styles.container}>
      
      <Text style={styles.title}>What The Film?</Text>
      <TextInput 
      style = {styles.searchbox}
      onChangeText={text => setState(prevState => { 
        return {... prevState, s: text}
      })}
      onSubmitEditing={search}
      value={state.s}>
      </TextInput>

  <ScrollView style={styles.results}>
    {/* I use map instead of foreach because it did not work */}
  {state.results.map(result => (
    <TouchableHighlight 
    key={result.imdbID} onPress={() => openPopup(result.imdbID)}
    >
      <View style={styles.results}>
        <Image style={styles.image}
          source={{ uri: result.Poster}}
  
          />
          <Text style={styles.heading}>{result.Title}</Text>
          </View>
          </TouchableHighlight>
  ))}
  </ScrollView>

<Modal 

    animationType="slide"
    transparent={false}
    visible={(typeof state.selected.Title != "undefined")}
    >
      <SafeAreaView style={styles.openPopup}>
        <Text style={styles.poptitle}>{state.selected.Title}</Text>
        <Text style={styles.rating}>Rating: {state.selected.imdbRating}</Text>
        <Text style={styles.plot}>Plot of the Movie:  {state.selected.Plot}</Text>
      </SafeAreaView>
      <TouchableHighlight
        onPress={() => setState(prevState => {
          return { ...prevState, selected: {}}

        })}
        >
          <Text style={styles.closeBtn}>return</Text>
        </TouchableHighlight>
    </Modal>
  </View>
  );
}

const styles = StyleSheet.create({  
    container: {
    flex: 1,
    backgroundColor: '#1c1f22',
    alignItems: 'center',
    justifyContent: 'flex start',
    paddingTop: 30,
    paddingHorizontal: 10
  },
  title: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20
  },

  searchbox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 10,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 50,
    marginBottom: 20
  }, 
  results:{
    flex: 1,
  },
  result: {
    flex: 1,
    width: '100%',
    marginBottom: 20
  },
  heading: {

    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundcolor: '#445565'
  },
  popup: {
    padding: 100,
  
  },
  poptitle: {

    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20
    
  },

  closeBtn:{
    padding: 20,
    fontSize: 20,
    fontWeight: '700',
    backgroundColor: '#2484C4',
    textAlign: 'center',
   
  },

  plot: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 13,

    backgroundColor: 'grey',
    borderRadius: 12,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 5,
    
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  rating: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 13,

    backgroundColor: 'grey',
    borderRadius: 12,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 5,
    
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,

    textAlign: 'center'
  
  },    

  image: {  
      width: '100%',
      height: 500,
      resizeMode: 'cover'
        
      
 
  }

});
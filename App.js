import React, {PureComponent} from 'react';  
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, FlatList, ActivityIndicator} from 'react-native';
import { createAppContainer } from 'react-navigation'; 
import { createStackNavigator } from 'react-navigation-stack';
import GoogleStaticMap from 'react-native-google-static-map';

const Separator = () => (
  <View style={styles.separator} />
);

class HomeScreen extends React.Component {  
    render() {  
        return (  
            <SafeAreaView style={styles.containerTwo}>
            <View>
              <Text style={styles.title}>
                Get the current time.
              </Text>
              <Button
                title="Press Me"
                onPress={() => this.props.navigation.navigate('Time')}
              />
            </View>
            <Separator />
            <View>
              <Text style={styles.title}>
                Get location. 
              </Text>
              <Button
                title="Press Me"
                color="#f194ff"
                onPress={() => this.props.navigation.navigate('Profile')} 
              />
            </View>
            <Separator />
            <View>
              <Text style={styles.title}>
                Get a random number between 0 - 100. 
              </Text>
              <Button
                title="Press me"
                onPress={() => Alert.alert('Cannot press this one')}
              />
            </View>
            <Separator />
          </SafeAreaView>
            
        );  
    }  
}  
class ProfileScreen extends React.Component {  
    render() {  
        return (  
          <View style={styles.container}>
          <GoogleStaticMap
            style={styles.map} 
            latitude={'49.246292'}
            longitude={'-123.116226'}
            zoom={13}
            size={{ width: 300, height: 550 }}
            apiKey={'AIzaSyB5zAKUhXkYxrUhi782DW6lnI64o0838Ow'}
          />
        </View>
      );  
    }  
}  

class TimeScreen extends PureComponent {
  state = {
      pokeList: [],
      loading: true
  }

  async componentDidMount() {
      try {
          const pokemonApiCall = await fetch('FILL IN ');
          const pokemon = await pokemonApiCall.json();
          this.setState({pokeList: pokemon.results, loading: false});
      } catch(err) {
          console.log("Error fetching data-----------", err);
      }
  }
  render() {
      const { pokeList, loading } = this.state;
      if(!loading) {
          return <FlatList 
                  data={pokeList}
                  // renderItem={this.renderItem}
                  keyExtractor={(item) => item.message} 
                  />
       //   return <Text>Hello</Text>
      } else {
          return <ActivityIndicator />
      }
  }
}
  
const AppNavigator = createStackNavigator(  
    {  
        Home: HomeScreen,  
        Profile: ProfileScreen, 
        Time: TimeScreen,
    },  
    {  
        initialRouteName: "Home"  
    }  
);  
  
const AppContainer = createAppContainer(AppNavigator);  
export default class App extends React.Component {  
    render() {  
        return <AppContainer />;  
    }  
}  

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  containerTwo: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

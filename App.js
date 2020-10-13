import React, {PureComponent} from 'react';  
import { StyleSheet, Button, View, SafeAreaView, Text} from 'react-native';
import { createAppContainer } from 'react-navigation'; 
import { createStackNavigator } from 'react-navigation-stack';
import GoogleStaticMap from 'react-native-google-static-map';
import { color } from 'react-native-reanimated';

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
                title="Time"
                onPress={() => this.props.navigation.navigate('Time')}
              />
            </View>
            <Separator />
            <View>
              <Text style={styles.title}>
                Get location. 
              </Text>
              <Button
                title="Location"
                color="#f194ff"
                onPress={() => this.props.navigation.navigate('Profile')} 
              />
            </View>
            <Separator />
            <View>
              <Text style={styles.title}>
                Try your luck! Will you draw the lucky number? ... 
              </Text>
              <Button
                title="Draw Number"
                onPress={() => this.props.navigation.navigate('Rand')}
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
  //Define your state for your component. 
  state = {
      pokeList: [],
      loading: true
  }

  async componentDidMount() {
      try {
          const pokemonApiCall = await fetch('http://appsetup.canadacentral.cloudapp.azure.com:5000/time');
          const pokemon = await pokemonApiCall.json();
          this.setState({pokeList: pokemon.message, loading: false});
      } catch(err) {
          console.log("Error fetching data-----------", err);
      }
  }
  render() {
      const { pokeList, loading } = this.state;
      if(!loading) {
          // return <FlatList 
          //         data={pokeList}
          //         keyExtractor={(item) => item.message} 
          //         renderItem={({item}) => <Text>{item.message}</Text>}
          //         />
        // return <FlatList data={this.state.pokeList} 
        // renderItem={({item}) => <Text>{item.name}</Text>}
        // keyExtractor={(item, index) =>index.toString()} />
        return <Text style={styles.titleText}>{this.state.pokeList}</Text>
      } else {
        //  return <ActivityIndicator />
        return <Text style={styles.titleText}> Loading ... </Text>
      }
  }
}

class RandScreen extends PureComponent {
  //Define your state for your component. 
  state = {
      randList: [],
      loading: true
  }

  async componentDidMount() {
      try {
          const randomCall = await fetch('http://appsetup.canadacentral.cloudapp.azure.com:5000/random');
          const rand_num = await randomCall.json();
          this.setState({randList: rand_num.message, loading: false});
      } catch(err) {
          console.log("Error fetching data-----------", err);
      }
  }
  render() {
      const { randList, loading } = this.state;
      if(!loading) {
        return <Text style={styles.titleText}>{this.state.randList}</Text>
      } else {
        //  return <ActivityIndicator />
        return <Text style={styles.titleText}> Loading ... </Text>
      }
  }
}
  
const AppNavigator = createStackNavigator(  
    {  
        Home: HomeScreen,  
        Profile: ProfileScreen, 
        Time: TimeScreen,
        Rand: RandScreen,
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
  titleText: {
    fontSize: 35,
    fontWeight: "bold",
    color: '#000',
  },
});

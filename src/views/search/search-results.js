import React from 'react';
import call from 'react-native-phone-call';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
    Button,
} from 'react-native';
import {infoArray} from './search';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      term: infoArray[0],
      location: infoArray[1],
    };
  }

  componentDidMount(): void {
    let url = `https://api.yelp.com/v3/businesses/search?term=${this.state.term}&location=${this.state.location}`;
    let bearer =
      'Bearer ' +
      'sC4J-NWeL9EQgXM_6uHjTKcD3cYf61f2KkGs7q5OFS5rcOdpGk0nCHksvn4CV3Vj17Ec4xZcOlXSsVDUVpW6u-asOgsFVtVf-6BxeXtTffCJ7NcU-3nle6YEJigRXXYx';
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.text())
      .then(resData => {
        const val = JSON.parse(resData);
        this.setState({
          isLoading: false,
          dataSource: val.businesses,
        });
      })
      .catch(error => {
        alert(error + this.state.dataSource);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{styles}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View>
          <ScrollView>
            {this.state.dataSource.map((item, index) => (
              <View key={item.id} style={styles.item}>
                <Text style={styles.text}>Business Name: {'\n'} {item.name}</Text>
                <Text style={styles.text}>Address: {item.location.display_address}</Text>
                <Text style={styles.text}>Rating: {item.rating}</Text>
                <Text style={styles.text}>Contact Number: {item.phone}</Text>
                <Button
                  color={'orange'}
                  title={'Contact'}
                  onPress={() =>
                    call({number: item.phone}).catch(console.error)}>
              </Button>
              </View>
            ))}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 0,
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#5882FA',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#25383C',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
  },
  Button: {
    backgroundColor: '#25383C',
    fontSize: 15,
    fontWeight: 'bold',
    alignContent: 'center',
  },
});

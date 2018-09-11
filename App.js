/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import ClapButton from './components/clapButton'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
      <ClapButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE3A7',
  }
});

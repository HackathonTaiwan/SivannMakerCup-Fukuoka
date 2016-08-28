'use strict';

import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Geolocation from './Geolocation/Geolocation';

export default function () {
  return (
  <View style={styles.container}>
    <Geolocation />
  </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

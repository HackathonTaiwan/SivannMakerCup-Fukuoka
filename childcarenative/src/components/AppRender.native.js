'use strict';

import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Geolocation from './Geolocation/Geolocation';
import FreebirdText from './FreebirdText/FreebirdText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default function () {
  return (
  <View style={styles.container}>
    <Geolocation />
    <FreebirdText />
  </View>);
}

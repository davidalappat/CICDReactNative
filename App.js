/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';
import {StyleSheet, View, Button} from 'react-native';

const checkPreviousSession = async () => {
  const didCrash = await Crashes.hasCrashedInLastSession();
  if (didCrash) {
    alert("Sorry about that crash, we're working on a solution");
  }
};
const App = () => {
  checkPreviousSession();
  return (
    <View style={styles.sectionContainer}>
      <Button
        title="Calculate Inflation"
        onPress={() =>
          Analytics.trackEvent('calculate_inflation', {
            Internet: 'Cellular',
            GPS: 'on',
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

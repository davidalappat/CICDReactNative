import React, {useState} from 'react';
import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';
import {StyleSheet, View, Button, TextInput, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const checkPreviousSession = async () => {
  const didCrash = await Crashes.hasCrashedInLastSession();
  if (didCrash) {
    alert("Sorry about that crash, we're working on a solution");
  }
};

const calculateInflationImpact = (value, inflationRate, time) => {
  return value / Math.pow(1 + inflationRate, time);
};

const App = () => {
  const [inflationRate, setInflationRate] = useState(0.0);
  const [riskFreeRate, setRiskFreeRate] = useState(0.0);
  const [amount, setAmount] = useState(0.0);
  const [timeInYears, setTimeInYears] = useState(1);
  const [afterInflation, setAfterInflation] = useState(0.0);
  const [atRiskFree, setAtRiskFree] = useState(0.0);
  const [atRiskFreeAfterInflation, setAtRiskFreeAfterInflation] = useState(0.0);
  const [difference, setDifference] = useState(0.0);

  checkPreviousSession();

  const calculate = () => {
    setAfterInflation(
      calculateInflationImpact(amount, inflationRate / 100, timeInYears),
    );
    setAtRiskFree(amount * Math.pow(1 + riskFreeRate / 100, timeInYears));

    setAtRiskFreeAfterInflation(
      calculateInflationImpact(atRiskFree, inflationRate / 100, timeInYears),
    );
    setDifference(atRiskFreeAfterInflation - afterInflation);
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Current inflation rate"
        style={styles.textBox}
        keyboardType="decimal-pad"
        value={String(inflationRate)}
        onChangeText={setInflationRate}
      />
      <TextInput
        placeholder="Current risk free rate"
        style={styles.textBox}
        keyboardType="decimal-pad"
        value={String(riskFreeRate)}
        onChangeText={setRiskFreeRate}
      />
      <TextInput
        placeholder="Amount you want to save"
        style={styles.textBox}
        keyboardType="decimal-pad"
        value={String(amount)}
        onChangeText={setAmount}
      />
      <TextInput
        placeholder="For how long (in years) will you save?"
        style={styles.textBox}
        keyboardType="decimal-pad"
        value={String(timeInYears)}
        onChangeText={setTimeInYears}
      />
      <Button
        title="Calculate Inflation"
        onPress={() => {
          calculate();
          Analytics.trackEvent('calculate_inflation', {
            Internet: 'Cellular',
            GPS: 'on',
          });
        }}
      />
      <Text style={styles.label}>
        {timeInYears} years from now you will still have ${amount} but it will
        only be worth ${afterInflation}.
      </Text>
      <Text style={styles.label}>
        But if you invest it at a risk free rate you will have ${atRiskFree}.
      </Text>
      <Text style={styles.label}>
        Which will be worth ${atRiskFreeAfterInflation} after inflation.
      </Text>
      <Text style={styles.label}>A difference of: ${difference}.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 16,
  },
  label: {
    marginTop: 10,
  },
  textBox: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

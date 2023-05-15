import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AppHeader({ heading }) {
  return (
    <View>
      <Text style={styles.header}>{heading}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
});

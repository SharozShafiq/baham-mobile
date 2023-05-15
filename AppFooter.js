import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AppFooter({ slogan }) {
  return (
    <View style={styles.container}>
      <Text style={styles.footer}>
        Copyright: Baham by project Dareecha (2023) -
        <Text style={styles.text}>
          Karachi Institute of Economics & Technology
        </Text>
      </Text>
      <Text style={styles.slogan}>{slogan}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.075,
    backgroundColor: 'fuchsia',
  },
  footer: {
    textAlign: 'center',
  },
  slogan: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'white',
  },
  text:{
    fontStyle: 'italic'
  }
});

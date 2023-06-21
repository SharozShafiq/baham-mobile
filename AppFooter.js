import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <View style={styles.container}>
      <Text style={styles.footer}>
        Copyright: Baham by project Dareecha ({currentYear}) -{' '}
        <Text style={{ fontStyle: 'italic' }}>Karachi Institute of Economics & Technology</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    backgroundColor: 'fuchsia',
  },
  footer: {
    textAlign: 'center',
    color: 'white',
  },
});

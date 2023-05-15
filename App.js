import React, { useState } from 'react';
import { StyleSheet, Text, View, SectionList, TextInput, Button } from 'react-native';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
//import Login from './Login';

const allVehicles = [ 
  {
    "type": "Sedan",
    "data": [
      {'id': 1, 'name': "Honda City", 'capacity': 4 }, 
      {'id': 2, 'name': "Honda Civic", 'capacity': 4 }, 
      {'id': 3, 'name': "Honda Accord", 'capacity': 5 }, 
      {'id': 4, 'name': "Toyota Corolla", 'capacity': 4 }, 
      {'id': 5, 'name': "Toyota Camry", 'capacity': 4 }, 
      {'id': 6, 'name': "Toyota Prius", 'capacity': 4 }, 
    ],
  },
  {
    "type": "Hatch back", 
    "data": [
      {'id': 7, 'name': "Honda Fit", 'capacity': 5 }, 
      {'id': 8, 'name': "Suzuki Mehran", 'capacity': 4 }, 
      {'id': 9, 'name': "Suzuki Alto", 'capacity': 4 }, 
      {'id': 10, 'name': "Suzuki Cultus", 'capacity': 4 }, 
      {'id': 11, 'name': "Suzuki Wagon R", 'capacity': 4 }, 
      {'id': 12, 'name': "Suzuki Swift", 'capacity': 4 }, 
      {'id': 13, 'name': "Toyota Vitz", 'capacity': 4 }, 
      {'id': 14, 'name': "Toyota Passo", 'capacity': 4 }, 
      {'id': 15, 'name': "Hyundai Santro", 'capacity': 4 }, 
    ]
  },
  {
    "type": "SUV",
    "data": [
      {'id': 16, 'name': "Hyundai Tucson", 'capacity': 5 }, 
      {'id': 17, 'name': "Kia Sportage", 'capacity': 5 }, 
      {'id': 18, 'name': "Toyota Hilux", 'capacity': 9 }, 
      {'id': 19, 'name': "Toyota Land Cruiser", 'capacity': 6 }, 
    ]
  },
  {
    "type": "Motorcycle",
    "data": [
      {'id': 20, 'name': "Kawasaki GTO110", 'capacity': 2 }, 
      {'id': 21, 'name': "Suzuki GSX125", 'capacity': 2 }, 
      {'id': 22, 'name': "Suzuki GS150", 'capacity': 2 }, 
      {'id': 23, 'name': "Yamaha YBR125", 'capacity': 2 },
    ]
  },
  {
    "type": "Van",
    "data": [
      {'id': 24, 'name': "Suzuki Bolan", 'capacity': 6 }, 
      {'id': 25, 'name': "Toyota Hiace", 'capacity': 13 },     
      {'id': 26, 'name': "Hyundai Shehroz", 'capacity': 10 }, 
      {'id': 27, 'name': "Kia Grand Carnival", 'capacity': 7 }, 
    ]
  }
]

export default function App() {
  const heading = 'Baham (باہم)';
  const slogan = 'Connecting People, Connecting Lives';

  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (text) => {
    setFeedback(text);
  };

  const handleSubmit = () => {
    console.log(feedback);
  };

  const renderSectionHeader = ({ section }) => {
    return <Text>{section.type}</Text>;
  };

  const renderVehicleModelItem = ({ item }) => {
    return (
      <View>
        <Text>
          {item.name} ({item.capacity})
        </Text>
      </View>
    );
  };

  const itemSeparatorComponent = () => <View style={styles.separator}></View>;

  return (
    <View style={styles.container}>
      <AppHeader heading={heading} />
      <View style={styles.mainContainer}>
        <SectionList
          sections={allVehicles}
          renderItem={renderVehicleModelItem}
          renderSectionHeader={renderSectionHeader}
          ItemSeparatorComponent={itemSeparatorComponent}
          keyExtractor={(item, index) => item.id * (item.id + index)}
        />
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Enter your feedback"
          value={feedback}
          onChangeText={handleFeedbackChange}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
      <AppFooter slogan={slogan} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'gold',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  separator: {
    borderColor: 'black',
    borderStyle: 'dotted',
    borderWidth: 1,
  },
  textInput: {
    height: 100,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

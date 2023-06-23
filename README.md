# baham-mobile

Model Paper:


 ScrollView: ScrollView is useful when you have a small or moderate amount of content that needs to be scrollable within a view.
ii. FlatList: FlatList is ideal when you have a long list of data that needs to be efficiently rendered, especially if the number of items is dynamic or potentially large. It uses lazy rendering and only renders the visible items
iii. SectionList: SectionList is suitable when you have a list of data that is organized into sections or groups. It allows you to render a list with section headers and individual items within each section.


 The Jest library is primarily used for testing JavaScript applications, including React and React Native applications. It is a popular testing framework that provides a comprehensive set of features and utilities for writing unit tests, integration tests, and snapshot tests.


 5-a
const LoginView = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./logo.png')}
        style={styles.imageBackground}
      >
        {/* Your login form components or content */}
      </ImageBackground>
    </View>
  );
};

 5-a-ii
const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    opacity: 0.8,
  },
});

 5-b
const Login = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./logo.png')}
        style={styles.imageBackground}
      >
        <Icon name="thumbs-down" size={100} color="red" />
        {/* Your login form components or content */}
      </ImageBackground>
    </View>
  );
};

 4-a-ii
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <View style={styles.footerContainer}>
      {/* Your footer text with the current year */}
    </View>
  );
};

6-a

const [showList, setShowList] = useState(false);

const toggleListVisibility = () => {
  setShowList(!showList);
};

     <Pressable onPress={toggleListVisibility}>
        <Text style={styles.showMenuText}>{showList ? "Hide" : "Show"}</Text>
      </Pressable>
      {showList && (
        <SectionList
          sections={allVehicles}
          renderItem={renderVehicleModelItem}
          renderSectionHeader={renderSectionHeader}
          ItemSeparatorComponent={itemSeparatorComponent}
          keyExtractor={(item, index) => item.id * (item.id + index)}
          horizontal={orientation === 'landscape'} // Set horizontal scrolling for landscape mode
          contentContainerStyle={orientation === 'landscape' ? styles.horizontalScrollContainer : null}
        />
      )}

 6-b confirm nhi hai yeh
const Menu = () => {
  const [isPortrait, setIsPortrait] = useState(true);
  const windowDimensions = useWindowDimensions();
  const deviceOrientation = useDeviceOrientation();

  useEffect(() => {
    setIsPortrait(deviceOrientation.portrait);
  }, [deviceOrientation]);

  return (
    <ScrollView
      horizontal={!isPortrait}
      vertical={isPortrait}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/* Your menu items */}
    </ScrollView>
  );
};


7-b
       <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = 'device-unknown';
              if (route.name === 'About') {
                iconName = focused ? 'info' : 'info-outline';
              } else if (route.name === 'Menu') {
                iconName = focused ? 'menu-open' : 'menu';
              } else if (route.name === 'Setting') {
                iconName = 'settings';
              } else if (route.name === 'Logout') {
                iconName = 'logout';
              }
              return <MaterialIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'navy',
            tabBarInactiveTintColor: 'gray',
          })}>





8-A



npm install --save react-native-sqlite-storage

Link the package with your project by running the following command:
npx react-native link react-native-sqlite-storage


import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'mydb.db',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully.');
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS blocked_items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT);'
      );
    });
  },
  (error) => {
    console.error('Failed to open database:', error);
  }
);

export default db;



import db from './database'; // Import the SQLite database module

// ...

renderVehicleModelItem = ({ item }) => {
  return (
    <TouchableWithoutFeedback
      onLongPress={() => this.handleBlockItem(item)} // Handle long-press event
    >
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

handleBlockItem = (item) => {
  db.transaction((tx) => {
    tx.executeSql('INSERT INTO blocked_items (text) VALUES (?);', [item], (tx, result) => {
      if (result.rowsAffected > 0) {
        console.log(`Blocked item '${item}' inserted successfully.`);
      }
    });
  });

  // Remove the blocked item from the list
  const updatedItems = this.state.vehicleModels.filter((model) => model !== item);
  this.setState({ vehicleModels: updatedItems });
};

// ...





8-B

npm install --save @react-native-async-storage/async-storage


import Icon from 'react-native-vector-icons/FontAwesome'; // Import the desired vector icon library

// ...

renderVehicleModelItem = ({ item }) => {
  const isFavorite = this.state.favorites.includes(item); // Check if the item is in favorites

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
      <TouchableWithoutFeedback onPress={() => this.handleToggleFavorite(item)}>
        <Icon
          name={isFavorite ? 'star' : 'star-o'} // Use the appropriate icon name based on whether it's a favorite or not
          size={24}
          color={isFavorite ? 'gold' : 'black'} // Use the appropriate color based on whether it's a favorite or not
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

// ...


import AsyncStorage from '@react-native-async-storage/async-storage';

// ...

handleToggleFavorite = async (item) => {
  let favorites = [...this.state.favorites];

  if (favorites.includes(item)) {
    // Remove from favorites
    favorites = favorites.filter((favorite) => favorite !== item);
  } else {
    // Add to favorites
    favorites.push(item);
  }

  try {
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites)); // Store the updated favorites list in AsyncStorage
    this.setState({ favorites }); // Update the state with the new favorites list
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

// ...



import AsyncStorage from '@react-native-async-storage/async-storage';

// ...

constructor(props) {
  super(props);
  this.state = {
    favorites: [], // Initialize the favorites state
    // ...
  };
}

componentDidMount() {
  this.loadFavorites();
}

loadFavorites = async () => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');
    if (favorites !== null) {
      this.setState({ favorites: JSON.parse(favorites) }); // Update the state with the stored favorites
    }
  } catch (error) {
    console.error('Error loading favorites:', error);
  }
};

// ...

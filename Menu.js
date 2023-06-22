import { StyleSheet, Text, Image, View, SectionList, Pressable } from 'react-native';
import { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';
const [showList, setShowList] = useState(false);


const [orientation, setOrientation] = useState('portrait');

const toggleListVisibility = () => {
  setShowList(!showList);
};
useEffect(() => {
  const updateOrientation = () => {
    const currentOrientation = Orientation.getInitialOrientation();
    setOrientation(currentOrientation);
  };

  updateOrientation(); // Get the initial orientation

  Orientation.addOrientationListener(updateOrientation);

  return () => {
    Orientation.removeOrientationListener(updateOrientation);
  };
}, []);


const allVehicles = [
  {
    "type": "Sedan",
    "data": [
      { 'id': 1, 'image_url': require('./assets/honda_city.jpg'), 'name': "Honda City", 'capacity': 4 },
      { 'id': 2, 'image_url': require('./assets/honda_civic.jpg'), 'name': "Honda Civic", 'capacity': 4 },
      { 'id': 3, 'image_url': require('./assets/honda_accord.jpg'), 'name': "Honda Accord", 'capacity': 5 },
      { 'id': 4, 'image_url': require('./assets/toyota_corolla.jpg'), 'name': "Toyota Corolla", 'capacity': 4 },
      { 'id': 5, 'image_url': require('./assets/toyota_camry.jpg'), 'name': "Toyota Camry", 'capacity': 4 },
      { 'id': 6, 'image_url': require('./assets/toyota_prius.jpg'), 'name': "Toyota Prius", 'capacity': 4 },
    ],
  },
  {
    "type": "Hatch back",
    "data": [
      { 'id': 7, 'image_url': require('./assets/honda_fit.jpg'), 'name': "Honda Fit", 'capacity': 5 },
      { 'id': 8, 'image_url': require('./assets/suzuki_mehran.jpg'), 'name': "Suzuki Mehran", 'capacity': 4 },
      { 'id': 9, 'image_url': require('./assets/suzuki_alto.jpg'), 'name': "Suzuki Alto", 'capacity': 4 },
      { 'id': 10,'image_url': require('./assets/suzuki_cultus.jpg'), 'name': "Suzuki Cultus", 'capacity': 4 },
      { 'id': 11,'image_url': require('./assets/suzuki_wagon_r.jpg'), 'name': "Suzuki Wagon R", 'capacity': 4 },
      { 'id': 12,'image_url': require('./assets/suzuki_swift.jpg'), 'name': "Suzuki Swift", 'capacity': 4 },
      { 'id': 13,'image_url': require('./assets/toyota_vitz.jpg'), 'name': "Toyota Vitz", 'capacity': 4 },
      { 'id': 14,'image_url': require('./assets/unknown_car.jpg'), 'name': "Toyota Passo", 'capacity': 4 },
      { 'id': 15,'image_url': require('./assets/hyundai_santro.jpg'), 'name': "Hyundai Santro", 'capacity': 4 },
    ]
  },
  {
    "type": "SUV",
    "data": [
      { 'id': 16, 'image_url': require('./assets/hyundai_tucson.jpg'), 'name': "Hyundai Tucson", 'capacity': 5 },
      { 'id': 17, 'image_url': require('./assets/kia_sportage.jpg'), 'name': "Kia Sportage", 'capacity': 5 },
      { 'id': 18, 'image_url': require('./assets/unknown_car.jpg'), 'name': "Toyota Hilux", 'capacity': 9 },
      { 'id': 19, 'image_url': require('./assets/toyota_land_cruiser.jpg'), 'name': "Toyota Land Cruiser", 'capacity': 6 },
    ]
  },
  {
    "type": "Motorcycle",
    "data": [
      { 'id': 20, 'image_url': require('./assets/kawasaki_gto110.jpg'), 'name': "Kawasaki GTO110", 'capacity': 2 },
      { 'id': 21, 'image_url': require('./assets/unknown_motorcycle.jpg'), 'name': "Suzuki GSX125", 'capacity': 2 },
      { 'id': 22, 'image_url': require('./assets/suzuki_gs150.jpg'), 'name': "Suzuki GS150", 'capacity': 2 },
      { 'id': 23, 'image_url': require('./assets/yamaha_ybr125.jpg'), 'name': "Yamaha YBR125", 'capacity': 2 },
    ]
  },
  {
    "type": "Van",
    "data": [
      { 'id': 24, 'image_url': require('./assets/suzuki_bolan.jpg'), 'name': "Suzuki Bolan", 'capacity': 6 },
      { 'id': 25, 'image_url': require('./assets/toyota_hiace.jpg'), 'name': "Toyota Hiace", 'capacity': 13 },
      { 'id': 26, 'image_url': require('./assets/unknown_car.jpg'), 'name': "Hyundai Shehroz", 'capacity': 10 },
      { 'id': 27, 'image_url': require('./assets/kia_grand_carnival.jpg'), 'name': "Kia Grand Carnival", 'capacity': 7 },
    ]
  }
]

const getMenuFromAPI = async () => {
  try {
    const response = await fetch("http://192.168.1.111:8000/api/vehicles");
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error); 
  }
};



export default function Menu(navigation) {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Login');
  };
  // Render the headers of section. Note that the input prop is section and we're using 'type' attribute inside
  const renderSectionHeader = ({ section }) => {

    const getIconUrl = () => {
      if (section.type == "Sedan") {
        return require('./assets/icon_sedan.png')
      }
      if (section.type == "Hatch back") {
        return require('./assets/icon_hatchback.png')
      }
      if (section.type == "SUV") {
        return require('./assets/icon_suv.png')
      }
      if (section.type == "Motorcycle") {
        return require('./assets/icon_motorcycle.png')
      }
      if (section.type == "Van") {
        return require('./assets/icon_van.png')
      }
      return require('./assets/icon_generic_car.png')
    }

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.menuHeader}>{section.type}</Text>
        <Image style={{width: 50, height: 50, resizeMode: 'contain'}} source={getIconUrl()} />
      </View>
    );
  };

  // Render each menu item
  const renderVehicleModelItem = ({ item }) => {
    const isFavorite = this.state.favorites.includes(item);
    return (
      //Commit Code for 8 A
      //<TouchableWithoutFeedback
      //onLongPress={() => this.handleBlockItem(item)} // Handle long-press event
      //>
      //<View style={styles.itemContainer}>
        //<Text style={styles.itemText}>{item}</Text>
      //</View>
    //</TouchableWithoutFeedback>
      <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
      <TouchableWithoutFeedback onPress={() => this.handleToggleFavorite(item)}>
        <Icon
          name={isFavorite ? 'star' : 'star-o'} // Use the appropriate icon name based on whether it's a favorite or not
          size={24}
          color={isFavorite ? 'gold' : 'black'} // Use the appropriate color based on whether it's a favorite or not
        />
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>
            <Image style={{ width: 100, height: 100, resizeMode: 'cover' }} source={item.image_url} />
            <Text style={styles.menuItem}>{item.name} ({item.capacity})</Text>
        </View>
      </View>
      </TouchableWithoutFeedback>
      </View>
    );
  }

handleBlockItem = (item) => {
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO blocked_items (text) VALUES (?);', [item], (tx, result) => {
        if (result.rowsAffected > 0) {
          console.log(`Blocked item '${item}' inserted successfully.`);
        }
      });
    });
  }

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
  constructor=(props)=>{
    super(props);
    this.state = {
      favorites: [], // Initialize the favorites state
      // ...
    };
  }
  
  componentDidMount=()=>{
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
  // Separator separates items. We're only using an empty view with border for now
  const itemSeparatorComponent = () => <View style={{ borderColor: 'black', borderStyle: "dotted", borderWidth: 1 }}></View>;

  return (
    <View style={styles.mainContainer}>
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
      <Pressable onPress={getMenuFromAPI}>
        <Text style={styles.link}>fetch</Text>
      </Pressable>

      <Pressable onPress={handleLogout}>
        <Text style={styles.logoutButton}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  horizontalScrollContainer: {
    flexDirection: 'row',
  },
  menuHeader: {
    textAlign: 'center',
    margin: 12,
    fontSize: 24,
    color: 'navy',
  },
  menuItem: {
    textAlign: 'center',
    margin: 12,
    fontSize: 24,
    color: 'maroon'
  },
  showMenuText: {
    fontSize: 18,
    color: 'navy',
    textAlign: 'center',
  },
  introText: {
    fontSize: 22,
    textAlign: 'center',
  },
  link: {
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    color: 'blue'
  },
});

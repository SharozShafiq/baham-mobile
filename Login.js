import { Text, View, TextInput, StyleSheet, Pressable, Alert,ImageBackground } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useState } from "react";

const emailValidationRegex = "^[0-9A-Za-z._+]+@[A-Za-z0-9]+.[A-Za-z0-9]+$"

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateEmail = () => {
        return email.match(emailValidationRegex);
    }

    const handleTextChange = (value) => {
        setEmail(value);
    }

    const handleLogin = () => {
        if (validateEmail() && password.length > 8) {
            // Navigate to the Main menu
            navigation.navigate('Menu');
        } else {
            Alert.alert("Provide a valid Email address and Password to log in.")
        }
    }

    return(
        <ImageBackground
      source={require('./assets/icon_sedan.png')}
      style={styles.backgroundImage}
    >
        <View style={styles.container}>
        <Icon name="thumbs-down" size={48} color="red" /> {/* Replace 'thumbs-down' with the desired icon name */}
            <Text style={styles.text}>Registered Email</Text>
            <TextInput
                style={[styles.input, {color: (validateEmail() ? 'black': 'red')}]}
                onChangeText={handleTextChange}
                value={email}
                placeholder="baham.user@kiet.edu.pk"
                keyboardType="email-address"
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={(value) => {setPassword(value)}}
                value={password}
                placeholder="Password1234"
                secureTextEntry
                keyboardType="default"
            />
            <Pressable onPress={handleLogin}>
                <Text style={styles.loginButton}>Login</Text>
            </Pressable>
            <Pressable>
                <Text style={styles.link}>Forgot Password</Text>
            </Pressable>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        opacity: 0.8,
      },
      container: {
        flex: 1,
        margin: 8,
        justifyContent: 'space-between',
      },
    text: {
        textAlign: 'center',
        fontSize: 24
    },
    input: {
        textAlign: 'center',
        margin: 10,
        padding: 10,
        fontSize: 24,
        borderWidth: 1,
        borderRadius: 15,
    },
    loginButton: {
        textAlign: 'center',
        margin: 10,
        padding: 10,
        fontSize: 24,
        borderWidth: 1,
        borderRadius: 15,
        color: 'gold',
        backgroundColor: 'darkblue',
    },
    link: {
        textAlign: 'center',
        fontSize: 20,
        fontStyle: 'italic',
        color: 'blue'
    },
});
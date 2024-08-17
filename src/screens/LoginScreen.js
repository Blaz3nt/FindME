// Login Screen
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../supabaseClient'; // Ensure this path is correct

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
      } else {
        // Store the access token in AsyncStorage
        const accessToken = data.session.access_token;
        await AsyncStorage.setItem('accessToken', accessToken);
        alert('Login successful!');
        navigation.navigate('Profile');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(`Failed to login: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <Button title="Login" onPress={handleLogin} />
      
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24, // Increased padding
    backgroundColor: '#f0f0f0', // Subtle background color
  },
  title: {
    fontSize: 32, // Larger font size
    fontWeight: 'bold',
    marginBottom: 32, // Increased margin
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8, // Increased margin
  },
  input: {
    height: 48, // Slightly taller input fields
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8, // Rounded corners
    marginBottom: 16, // Increased margin
    paddingHorizontal: 12, // Increased padding
    backgroundColor: 'white', // White background for contrast
  },
  signUpText: {
    marginTop: 24, // Increased margin
    fontSize: 16,
    color: 'black', // Make the link stand out
    textAlign: 'center',
  },
});

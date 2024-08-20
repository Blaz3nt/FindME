import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../supabaseClient'; 
import Svg, { LinearGradient, Rect, Stop } from 'react-native-svg'; 
import styles from '../styles/LoginScreenSyles';
import buttonStyles from '../styles/ButtonSyles';  // Import the common button styles

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

        // Store the user's UUID
        const userUUID = data.user.id; 
        await AsyncStorage.setItem('userUUID', userUUID);
        alert('UUID' + userUUID);

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
        style={[
          styles.input, 
          Platform.OS === 'android' ? { elevation: 2 } : { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 } 
        ]} 
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"   
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={[
          styles.input, 
          Platform.OS === 'android' ? { elevation: 2 } : { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 } 
        ]} 
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />

      <Pressable 
        style={buttonStyles.buttonContainer} 
        onPress={handleLogin}
      >
        <Svg height="56" width="100%"> 
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#007bff" />
            <Stop offset="1" stopColor="#0056b3" />
          </LinearGradient>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" rx={12} /> 
        </Svg>
        <Text style={buttonStyles.buttonText}>Login</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </Pressable> 
    </View>
  );
}

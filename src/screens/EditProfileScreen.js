import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfileScreen({ navigation }) {
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (!accessToken) {
          throw new Error('No access token found');
        }

        const response = await fetch('https://61.245.128.140:3000/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        const userData = await response.json();
        console.log('API Response:', userData);

        if (response.ok) {
          // Populate the fields if data exists
          if (userData) {
            setBio(userData.bio || '');
            setGender(userData.gender || '');
            setAge(userData.age ? String(userData.age) : '');
            setLocation(userData.location || '');
            setProfileImageUrl(userData.profile_image_url || '');
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error.message);
        Alert.alert('Error', 'Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch('https://61.245.128.140:3000/api/profile', {
        method: 'POST', // Or 'PUT' depending on your API implementation
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bio,
          gender,
          age: Number(age), // Ensure age is sent as a number
          location,
          profile_image_url: profileImageUrl,
          hascompletedprofile: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      Alert.alert('Success', 'Profile saved successfully!');
      navigation.navigate('Profile');
    } catch (error) {
      console.error('Error saving profile:', error.message);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bio:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your bio"
        value={bio}
        onChangeText={setBio}
      />

      <Text style={styles.label}>Gender:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your gender"
        value={gender}
        onChangeText={setGender}
      />

      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your location"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Profile Image URL:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your profile image URL"
        value={profileImageUrl}
        onChangeText={setProfileImageUrl}
      />

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
});

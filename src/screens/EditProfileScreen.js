import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { uploadProfileImage } from './uploadProfileImage';  // Import the upload function
import Svg, { LinearGradient, Rect, Stop } from 'react-native-svg'; 
import styles from '../styles/EditProfileScreenStyle';  // Import the styles
import buttonStyles from '../styles/ButtonSyles';  // Import the common button styles

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

        const response = await fetch('https://api.arise.vision:3000/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        const userData = await response.json();
        console.log('API Response:', userData);

        if (response.ok) {
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        setLoading(true);
        const imageUrl = await uploadProfileImage(result.uri);  // Use the separated upload function
        setProfileImageUrl(imageUrl);  // Set the profile image URL after upload
      } catch (error) {
        Alert.alert('Error', `Failed to upload image: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch('https://api.arise.vision:3000/api/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bio,
          gender,
          age: Number(age),
          location,
          profile_image_url: profileImageUrl,  // Use the uploaded image URL
          hascompletedprofile: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      Alert.alert('Success', 'Profile saved successfully!');
      navigation.navigate('Profile', { refresh: true });  // Trigger a refresh on the Profile screen
    } catch (error) {
      console.error('Error saving profile:', error.message);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Profile Image:</Text>
      <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
      <Pressable 
        style={buttonStyles.buttonContainer}  
        onPress={pickImage}
    >
          <Svg height="56" width="100%"> 
              <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                  <Stop offset="0" stopColor="#007bff" />
                  <Stop offset="1" stopColor="#0056b3" />
              </LinearGradient>
              <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" rx={12} /> 
          </Svg>
          <Text style={buttonStyles.buttonText}>Pick an image</Text> 
      </Pressable>

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

      <Pressable 
  style={buttonStyles.buttonContainer} 
  onPress={handleSave}
>
  <Svg height="56" width="100%"> 
    <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
      <Stop offset="0" stopColor="#007bff" />
      <Stop offset="1" stopColor="#0056b3" />
    </LinearGradient>
    <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" rx={12} />
  </Svg>
  <Text style={buttonStyles.buttonText}>Save</Text>
</Pressable>


    </View>
  );
}

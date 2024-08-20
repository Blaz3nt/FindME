import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { LinearGradient, Rect, Stop } from 'react-native-svg'; 
import styles from '../styles/ProfileStyles'; 
import buttonStyles from '../styles/ButtonSyles'; 

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
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

        if (response.ok && userData.hascompletedprofile) {
          setProfile(userData);
        } else {
          navigation.navigate('EditProfile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error.message);
        Alert.alert('Error', 'Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchProfile(); // Refresh the profile data whenever the screen is focused
    });

    fetchProfile(); // Initial load

    return unsubscribe;
  }, [navigation]);


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!profile) {
    return null; // No profile data yet, and screen navigation should have already happened
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}> 
        {profile.profile_image_url ? (
          <Image source={{ uri: profile.profile_image_url }} style={styles.profileImage} />
        ) : (
          <Icon name="user-circle" size={120} color="#ccc" style={styles.profileImage} /> 
        )}
        <Text style={styles.label}>Bio: {profile.bio}</Text>
        <Text style={styles.label}>Gender: {profile.gender}</Text>
        <Text style={styles.label}>Age: {profile.age}</Text>
        <Text style={styles.label}>Location: {profile.location}</Text>

        <Pressable 
          style={buttonStyles.buttonContainer} 
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Svg height="56" width="100%"> 
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#007bff" />
              <Stop offset="1" stopColor="#0056b3" />
            </LinearGradient>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" rx={12} /> 
          </Svg>
          <Text style={buttonStyles.buttonText}>Edit Profile</Text>
        </Pressable>
      </View>
    </View>
  );
}
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import AsyncStorage from '@react-native-async-storage/async-storage';

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

        const response = await fetch('https://61.245.128.140:3000/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        const userData = await response.json();
        console.log('API Response:', userData);  // Log the response to verify it

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

    fetchProfile();
  }, [navigation]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!profile) {
    return null; // No profile data yet, and screen navigation should have already happened
  }

  return (
    <View style={styles.container}>
      {profile.profile_image_url ? (
        <Image source={{ uri: profile.profile_image_url }} style={styles.profileImage} />
      ) : (
        <Icon name="user-circle" size={120} color="#ccc" style={styles.profileImage} /> // Default icon
      )}
      <Text style={styles.label}>Bio: {profile.bio}</Text>
      <Text style={styles.label}>Gender: {profile.gender}</Text>
      <Text style={styles.label}>Age: {profile.age}</Text>
      <Text style={styles.label}>Location: {profile.location}</Text>
      <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
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
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
});

// Home Screen
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  
  useEffect(() => {
    // Automatically navigate to the ProfileScreen when HomeScreen is loaded
    navigation.navigate('Profile');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Redirecting to your profile...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

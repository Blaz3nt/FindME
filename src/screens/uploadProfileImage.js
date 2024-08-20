import AsyncStorage from '@react-native-async-storage/async-storage';

export const uploadProfileImage = async (uri) => {
  try {
    // Retrieve UUID and Access Token from AsyncStorage
    const userUUID = await AsyncStorage.getItem('userUUID');
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (!userUUID) {
      throw new Error('User UUID not found');
    }

    if (!accessToken) {
      throw new Error('Access token not found');
    }

    // Create a FormData object and append the image and UUID
    const fileName = '${userUUID}-${Date.now()}.png';
    const formData = new FormData();
    formData.append('image', {
      uri,
      type: 'image/png',  // Adjust MIME type based on the image type
      name: fileName,
    });
    formData.append('userUUID', userUUID);

    // Upload the image to the server-side API
    const uploadResponse = await fetch('https://api.arise.vision/api/upload-profile-image', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ${accessToken}',  // Include the access token for authentication
      },
      body: formData,
    });

    const result = await uploadResponse.json();
    if (!uploadResponse.ok) {
      throw new Error(result.error || 'Failed to upload image');
    }

    return result.publicURL;  // Return the URL of the uploaded image
  } catch (error) {
    console.error('Error uploading image:', error.message);
    throw error;
  }
};
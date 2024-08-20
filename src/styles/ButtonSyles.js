import { StyleSheet, Platform } from 'react-native';

const buttonStyles = StyleSheet.create({
  buttonContainer: {
    position: 'relative',
    marginBottom: 24,
    height: 56,
    borderRadius: 12,
    overflow: 'hidden', 

    // Simulate gradient with backgroundColor and shadow
    backgroundColor: '#007bff', // Start color of the gradient
    ...Platform.select({
      ios: {
        shadowColor: '#0056b3', // End color of the gradient (for iOS shadow)
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 3, // Simulate shadow on Android
      },
    }),
  },
  buttonText: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 56,
  },
});

export default buttonStyles;
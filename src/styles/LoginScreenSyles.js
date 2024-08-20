import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 32, 
    backgroundColor: '#fff', 
  },
  title: {
    fontSize: 36, 
    fontWeight: '700', 
    marginBottom: 40, 
    textAlign: 'center',
    color: '#333', 
  },
  label: {
    fontSize: 16, 
    marginBottom: 8, 
    color: '#555', 
  },
  input: {
    height: 56, 
    borderColor: '#e0e0e0', 
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 20, 
    paddingHorizontal: 16, 
    backgroundColor: '#f5f5f5', 
    fontSize: 16,
  },
  signUpText: {
    marginTop: 24, 
    fontSize: 16,
    color: '#007bff', 
    textAlign: 'center',
  },
  loginButtonContainer: {
    position: 'relative',
    marginBottom: 24,
    height: 56, 
  },
  loginButtonText: {
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

export default styles;

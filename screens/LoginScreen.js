import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firebase from '../utils/firebase';
import { Link } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isValid) return;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      
        <Text style={styles.signupLink}>
          Don't have an account? <Link screen="Signup" style={styles.signupText}>Sign up</Link>
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f9fc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8, 
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupLink: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
    color: '#555',
  },
  signupText: {
    color: '#6200ea',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
});

export default LoginScreen;
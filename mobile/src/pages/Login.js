import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('List');
      }
    })
  }, [])

  async function handleSubmit() {
    const response = await api.post('/sessions', {
      email
    })

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('List');
  }

  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>Seu e-mail <Text style={styles.icon}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Tecnologias <Text style={styles.icon}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Suas tecnologias de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Encontrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },

  form: {
    alignSelf: 'stretch',
    marginTop: 30,
    paddingHorizontal: 30
  },

  label: {
    color: '#444',
    fontWeight: 'bold',
    marginBottom: 8
  },

  input: {
    borderColor: '#ddd',
    borderRadius: 2,
    borderWidth: 1,
    color: '#444',
    height: 44,
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 20
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#f05a5b',
    borderRadius: 2,
    height: 42,
    justifyContent: 'center'
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },

  icon: {
    color: '#e14f50',
    fontSize: 16,
    fontWeight: '700'
  }
});

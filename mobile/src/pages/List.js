import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, AsyncStorage, Image, TouchableOpacity, Text } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png'

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storageTechs => {
      const techsArray = storageTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  }, []);

  async function logout() {
    await AsyncStorage.removeItem('user');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>

      <TouchableOpacity style={styles.logout} onPress={logout} >
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  logo: {
    height: 32,
    alignSelf: 'center',
    marginTop: 10,
    resizeMode: 'contain',
  },

  logout: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    height: 30,
    marginTop: 60,
    resizeMode: 'contain',
  }
})
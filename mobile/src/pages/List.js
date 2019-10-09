import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage, TouchableOpacity, Text } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://10.0.1.86:3333', {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em: ${booking.spot.company} para ${booking.date} foi ${booking.approved ? 'Aprovada!' : 'Rejeitada.'}`);
      })
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  async function logout() {
    await AsyncStorage.removeItem('user');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
        <TouchableOpacity onPress={logout} style={styles.button}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    alignSelf: 'center',
    height: 32,
    marginTop: 10,
    resizeMode: 'contain',
  },

  logout: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    height: 30,
    marginBottom: 30,
    marginTop: 30,
  }
});
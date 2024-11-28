import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ItemCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <View style={styles.content}>
      <Text style={styles.title}>{item.make} {item.model}</Text>
      <Text style={styles.subtitle}>{item.color} | {item.year}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { flexDirection: 'row', marginBottom: 16, backgroundColor: '#fff', padding: 8, borderRadius: 8, elevation: 3 },
  image: { width: 80, height: 80, marginRight: 16, borderRadius:8 },
  content: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666' },
});

export default ItemCard;

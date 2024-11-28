import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const DetailsScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          {item.year} {item.make} {item.model}
        </Text>
        <Text style={styles.price}>${item.price.toLocaleString()}</Text>
        <Text style={styles.subtitle}>Specifications</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Color:</Text>
          <Text style={styles.infoValue}>{item.color}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Mileage:</Text>
          <Text style={styles.infoValue}>{item.mileage.toLocaleString()} miles</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Fuel Type:</Text>
          <Text style={styles.infoValue}>{item.fuelType}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Transmission:</Text>
          <Text style={styles.infoValue}>{item.transmission}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Engine:</Text>
          <Text style={styles.infoValue}>{item.engine}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Horsepower:</Text>
          <Text style={styles.infoValue}>{item.horsepower} HP</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Owners:</Text>
          <Text style={styles.infoValue}>{item.owners}</Text>
        </View>
        <Text style={styles.subtitle}>Features</Text>
        {item.features.map((feature, index) => (
          <Text key={index} style={styles.feature}>
            • {feature}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  image: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333333",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    color: "#555555",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#777777",
  },
  infoValue: {
    fontSize: 16,
    color: "#333333",
  },
  feature: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 4,
  },
});

export default DetailsScreen;

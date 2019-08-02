import React from "react";
import { Dimensions, StyleSheet, Text, View, FlatList } from "react-native";
import { compose, pure, setDisplayName } from "recompose";
import TaskCard from "../../components/taskCard";

const white = "#fff";
const purple = "#4f52ff";
const black = "#333";
const grey = "#999";

const isSmallScreen = Dimensions.get("window").width < 360;

const hitSlop = { top: 15, bottom: 15, left: 15, right: 15 };

const styles = StyleSheet.create({
  card: {
    backgroundColor: white,
    borderRadius: 15,
    elevation: 3,
    marginBottom: 15,
    marginHorizontal: 20,
    minHeight: 100,
    padding: 10
  },
  descriptionText: {
    color: grey,
    fontSize: 14,
    marginBottom: 10
  },
  titleText: {
    color: black,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10
  }
});

const Home = compose(
  pure,
  setDisplayName("Home")
)(({ title, description }) => (
  <View style={styles.card}>
    <Text style={styles.titleText}>{title}</Text>
    <Text style={styles.descriptionText}>{description}</Text>
  </View>
));

export default Home;

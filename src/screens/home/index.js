import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { compose, pure, setDisplayName } from "recompose";

const white = "#fff";
const white2 = "#eee";
const red = "#ec3131";
const statusBar = "#90151a";
const black = "#333";
const grey = "#aaa";

const isSmallScreen = Dimensions.get("window").width < 360;

const hitSlop = { top: 15, bottom: 15, left: 15, right: 15 };

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: white,
    flex: 1
  }
});

const Home = compose(
  pure,
  setDisplayName("Home")
)(({}) => (
  <View style={styles.bigContainer}>
    <Text>Home</Text>
  </View>
));

export default Home;

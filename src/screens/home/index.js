import React from "react";
import { Dimensions, StyleSheet, ScrollView, Text, View, FlatList } from "react-native";
import { compose, pure, setDisplayName } from "recompose";
import TaskCard from "../../components/taskCard";

const white = "#fff";
const purple = "#4f52ff";
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
  },
  header: {
    alignItems: "center",
    backgroundColor: purple,
    height: 150,
    paddingHorizontal: 10
  },
  headerText: {
    color: white,
    fontWeight: "700",
    fontSize: 20,
    paddingTop: 30
  },
  listContainer: {
    marginTop: -40,
    marginBottom: 100
  }
});

const data = [
  {
    id: 1,
    title: "Fase de elaboración de presupuesto",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit ullamcorper, justo class cursus turpis purus maecenas sem."
  },
  {
    id: 2,
    title: "Fase de investigación del proyecto",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit ullamcorper, justo class cursus turpis purus maecenas sem."
  },
  {
    id: 3,
    title: "Fase de diseño",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit ullamcorper, justo class cursus turpis purus maecenas sem."
  },
  {
    id: 4,
    title: "Fase de implementación del proyecto",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit ullamcorper, justo class cursus turpis purus maecenas sem."
  },
  {
    id: 5,
    title: "Fase de revisión",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit ullamcorper, justo class cursus turpis purus maecenas sem."
  }
];

const keyExtractor = item => item.id.toString();

// eslint-disable-next-line react/display-name, react/prop-types
const renderItem = ({ item }) => <TaskCard title={item.title} description={item.description} />;

const Home = compose(
  pure,
  setDisplayName("Home")
)(({}) => (
  <View style={styles.bigContainer}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Adminsitrador de tareas</Text>
    </View>
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  </View>
));

export default Home;

import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StatusBar,
  TextInput,
  Modal
} from "react-native";
import { compose, pure, setDisplayName, withStateHandlers } from "recompose";
import TaskCard from "../../components/taskCard";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

const white = "#fff";
const purple = "#4f52ff";
const statusBar = "#3b3dbf";
const statusBarBlack = "#000";
const black = "#333";
const grey = "#999";
const grey2 = "#555";
const light = "#dedede";
const transparency = "rgba(0, 0, 0, .7)";

const isSmallScreen = Dimensions.get("window").width < 360;

const hitSlop = { top: 15, bottom: 15, left: 15, right: 15 };

const ios = Platform.OS === "ios";

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: white,
    flex: 1
  },
  button: {
    paddingHorizontal: 10
  },
  buttonCancel: {
    color: grey2,
    fontSize: 15,
    fontWeight: "700"
  },
  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 40
  },
  buttonText: {
    color: purple,
    fontSize: 15,
    fontWeight: "700"
  },
  card: {
    backgroundColor: white,
    borderRadius: 15,
    elevation: 3,
    marginBottom: 15,
    marginHorizontal: 20,
    minHeight: 100,
    paddingHorizontal: 10,
    paddingVertical: 30
  },
  cardText: {
    color: grey,
    fontSize: 15,
    textAlign: "center"
  },
  contentModal: {
    backgroundColor: white,
    borderRadius: 15,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "90%"
  },
  floatButton: {
    alignItems: "center",
    backgroundColor: purple,
    borderRadius: ios ? 30 : 100,
    bottom: 15,
    elevation: 5,
    height: 60,
    justifyContent: "center",
    position: "absolute",
    right: 15,
    width: 60
  },
  header: {
    alignItems: "center",
    backgroundColor: purple,
    height: 100,
    paddingHorizontal: 10
  },
  headerText: {
    color: white,
    fontWeight: "700",
    fontSize: 20,
    paddingTop: 15
  },
  input: {
    borderColor: light,
    borderRadius: ios ? 100 : 100,
    borderWidth: 1,
    height: 40,
    marginBottom: 8,
    paddingHorizontal: 10
  },
  listContainer: {
    marginTop: -40,
    marginBottom: 100
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: transparency,
    flex: 1,
    justifyContent: "center"
  },
  titleModal: {
    color: black,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center"
  },
});

const data = [
  // {
  //   id: 1,
  //   title: "Fase de elaboración de presupuesto",
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur adipiscing elit ullamcorper, justo class cursus turpis purus maecenas sem.",
  //   time: "2 dias",
  //   picture: "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg"
  // },
  // {
  //   id: 2,
  //   title: "Fase de investigación del proyecto",
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur adipiscing elit ullamcorper, justo class cursus turpis purus maecenas sem.",
  //   time: "2 dias",
  //   picture: "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg"
  // },
  // {
  //   id: 3,
  //   title: "Fase de diseño",
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur adipiscing elit ullamcorper, justo class cursus turpis purus maecenas sem.",
  //   time: "2 dias",
  //   picture: "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg"
  // },
  // {
  //   id: 4,
  //   title: "Fase de implementación del proyecto",
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur adipiscing elit ullamcorper, justo class cursus turpis purus maecenas sem.",
  //   time: "2 dias",
  //   picture: "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg"
  // },
  // {
  //   id: 5,
  //   title: "Fase de revisión",
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur adipiscing elit ullamcorper, justo class cursus turpis purus maecenas sem.",
  //   time: "2 dias",
  //   picture: "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg"
  // }
];

const keyExtractor = item => item.id.toString();

// eslint-disable-next-line react/display-name, react/prop-types
const renderItem = ({ item }) => (
  <TaskCard
    title={item.title}
    description={item.description}
    time={item.time}
    picture={item.picture}
  />
);

const renderEmpty = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.cardText}>No tienes tareas registradas aún.</Text>
    <Text style={styles.cardText}>¡Crea una nueva tarea!</Text>
  </View>
);

const Home = compose(
  pure,
  withStateHandlers(
    { visible: false },
    {
      toggleModal: ({ visible }) => () => ({
        visible: !visible
      })
    }
  ),
  setDisplayName("Home")
)(({ visible, toggleModal }) => (
  <View style={styles.bigContainer}>
    <StatusBar backgroundColor={statusBar} barStyle="light-content" />
    <View style={styles.header}>
      <Text style={styles.headerText}>Adminsitrador de tareas</Text>
    </View>
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
      />
    </View>
    <TouchableOpacity style={styles.floatButton} onPress={toggleModal}>
      <MaterialIcon name="plus" size={30} color={white} />
    </TouchableOpacity>

    <Modal
      openModal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalContainer}>
        <StatusBar backgroundColor={statusBarBlack} barStyle="light-content" />
        <View style={styles.contentModal}>
          <Text style={styles.titleModal}>Nueva tarea</Text>
          <TextInput
            style={styles.input}
            placeholder="Título de la tarea"
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
          />
          <TextInput
            style={styles.input}
            keyboardType={"number-pad"}
            placeholder="Tiempo estimado"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleModal}
              hitSlop={hitSlop}
            >
              <Text style={styles.buttonCancel}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} hitSlop={hitSlop}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  </View>
));

export default Home;

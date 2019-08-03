import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { compose, pure, setDisplayName, withStateHandlers } from "recompose";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

const white = "#fff";
const purple = "#4f52ff";
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
    marginTop: 50
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
    padding: 10
  },
  closeModal: {
    alignItems: "center",
    left: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0
  },
  contentModal: {
    backgroundColor: white,
    borderRadius: 15,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "90%"
  },
  descriptionText: {
    color: grey,
    fontSize: 14,
    marginBottom: 10
  },
  employeeContentModal: {
    backgroundColor: white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 10,
    justifyContent: "flex-end",
    minHeight: 130,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  employeeModalContainer: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "flex-end"
  },
  employeeName: {
    color: black,
    fontSize: 18,
    fontWeight: "700"
  },
  employeeType: {
    color: grey2,
    fontSize: 14
  },
  info: {
    alignItems: "flex-end",
    flexDirection: "row"
  },
  infoEmployee: {
    flexDirection: "row"
  },
  infoPicture: {
    borderRadius: ios ? 100 : 100,
    height: 60,
    width: 60
  },
  infoPictureBorder: {
    alignItems: "center",
    borderColor: purple,
    borderRadius: ios ? 100 : 100,
    borderWidth: 1.5,
    height: 70,
    justifyContent: "center",
    width: 70
  },
  infoEmployeeRight: {
    marginLeft: 10
  },
  input: {
    borderColor: light,
    borderRadius: ios ? 100 : 100,
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 10
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: transparency,
    flex: 1,
    justifyContent: "center"
  },
  picture: {
    borderRadius: ios ? 100 : 100,
    height: 34,
    width: 34
  },
  pictureBorder: {
    alignItems: "center",
    borderColor: purple,
    borderRadius: ios ? 100 : 100,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    width: 40
  },
  pictureContainer: {
    alignItems: "flex-end",
    flex: 0
  },
  time: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  timeText: {
    color: grey2,
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 3
  },
  titleModal: {
    color: black,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center"
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
  withStateHandlers(
    { visible: false },
    {
      toggleModal: ({ visible }) => () => ({
        visible: !visible
      })
    }
  ),
  withStateHandlers(
    { visibleEmployee: false },
    {
      toggleEmployeeModal: ({ visibleEmployee }) => () => ({
        visibleEmployee: !visibleEmployee
      })
    }
  ),
  setDisplayName("Home")
)(
  ({
    title,
    description,
    time,
    picture,
    toggleModal,
    visible,
    visibleEmployee,
    toggleEmployeeModal
  }) => (
    <TouchableOpacity style={styles.card} onPress={toggleModal}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
      <View style={styles.info}>
        <View style={styles.time}>
          <MaterialIcon name="clock-outline" size={15} color={purple} />
          <Text style={styles.timeText}>{`${time} restantes`}</Text>
        </View>
        <View style={styles.pictureContainer}>
          <TouchableOpacity
            style={styles.pictureBorder}
            onPress={toggleEmployeeModal}
            hitSlop={hitSlop}
          >
            <Image source={{ uri: picture }} style={styles.picture} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        openModal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <StatusBar
            backgroundColor={statusBarBlack}
            barStyle="light-content"
          />
          <View style={styles.contentModal}>
            <Text style={styles.titleModal}>Tiempo trabajado</Text>
            <TextInput
              style={styles.input}
              keyboardType={"decimal-pad"}
              placeholder="Introduzca el tiempo restante"
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

      <Modal
        openModal
        animationType="slide"
        transparent
        visible={visibleEmployee}
        onRequestClose={toggleEmployeeModal}
      >
        <TouchableWithoutFeedback onPress={toggleEmployeeModal}>
          <View style={styles.employeeModalContainer}>
            <StatusBar
              backgroundColor={statusBarBlack}
              barStyle="light-content"
            />
            <TouchableWithoutFeedback>
              <View style={styles.employeeContentModal}>
                <View style={styles.closeModal}>
                  <TouchableOpacity
                    onPress={toggleEmployeeModal}
                    hitSlop={hitSlop}
                  >
                    <MaterialIcon name="chevron-down" size={35} color={grey} />
                  </TouchableOpacity>
                </View>
                <View style={styles.infoEmployee}>
                  <View>
                    <View
                      style={styles.infoPictureBorder}
                      onPress={toggleEmployeeModal}
                      hitSlop={hitSlop}
                    >
                      <Image
                        source={{ uri: picture }}
                        style={styles.infoPicture}
                      />
                    </View>
                  </View>
                  <View style={styles.infoEmployeeRight}>
                    <Text style={styles.employeeName}>Jeraldine Silvera</Text>
                    <Text style={styles.employeeType}>Programador</Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </TouchableOpacity>
  )
);

export default Home;

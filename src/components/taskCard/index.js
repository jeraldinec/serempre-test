import React, { Fragment } from "react";
import {
  Dimensions,
  Image,
  Modal,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { compose, pure, setDisplayName, withStateHandlers } from "recompose";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-community/async-storage";
import { Formik } from "formik";
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
} from "react-native-formik";
import * as Yup from "yup";
import styles from "./styles";

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextInput);
const Form = withNextInputAutoFocusForm(View);

const white = "#fff";
const statusBarBlack = "#000";
const grey = "#999";

const isSmallScreen = Dimensions.get("window").width < 360;

const hitSlop = { top: 15, bottom: 15, left: 15, right: 15 };

const validationSchema = Yup.object().shape({
  worked: Yup.string().required()
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
    employee,
    worked,
    id,
    toggleModal,
    visible,
    visibleEmployee,
    toggleEmployeeModal,
    setData
  }) => (
    <TouchableOpacity
      style={[
        styles.card,
        time - worked > 0 ? styles.borderPending : styles.borderCompleted
      ]}
      onPress={time - worked > 0 ? toggleModal : null}
    >
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.descriptionText}>
        {description.length > 16
          ? `${description.substring(0, 16).toLowerCase()}...`
          : description}
      </Text>
      <View style={styles.info}>
        {time - worked <= 0 ? (
          <View style={styles.time}>
            <View style={styles.timeCompleted}>
              <MaterialIcon name={"check"} size={13} color={white} />
              <Text style={styles.timeText}>Completado</Text>
            </View>
          </View>
        ) : (
          <View style={styles.time}>
            <View style={styles.timePending}>
              <MaterialIcon name={"clock-outline"} size={13} color={white} />
              <Text style={styles.timeText}>{`${Number(
                (time - worked).toFixed(2)
              )} horas restantes`}</Text>
            </View>
          </View>
        )}
        <View style={styles.pictureContainer}>
          <TouchableOpacity
            style={styles.pictureBorder}
            onPress={toggleEmployeeModal}
            hitSlop={hitSlop}
          >
            <Image
              source={{
                uri:
                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              }}
              style={styles.picture}
            />
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
            <Formik
              onSubmit={() => {}}
              validationSchema={validationSchema}
              render={({ values, isValid }) => {
                return (
                  <Form>
                    <MyInput
                      placeholder="Introduzca el tiempo restante"
                      name="worked"
                      type="name"
                      keyboardType={"decimal-pad"}
                      style={styles.input}
                    />

                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={toggleModal}
                        hitSlop={hitSlop}
                      >
                        <Text style={styles.buttonCancel}>Cancelar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.button}
                        disabled={!isValid}
                        onPress={async () => {
                          try {
                            let storage = await AsyncStorage.getItem("task");
                            if (storage) {
                              storage = JSON.parse(storage);
                              let found = storage.filter(function(el) {
                                return el.id === id;
                              })[0];
                              if (found) {
                                found.worked =
                                  parseFloat(found.worked) +
                                  parseFloat(values.worked);
                              }
                              AsyncStorage.setItem(
                                "task",
                                JSON.stringify(storage)
                              );
                              setData(storage);
                            } else {
                            }
                            toggleModal();
                          } catch (e) {
                            alert(e);
                          }
                        }}
                        hitSlop={hitSlop}
                      >
                        <Text
                          style={
                            isValid
                              ? styles.buttonText
                              : styles.buttonTextDisabled
                          }
                        >
                          Guardar
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Form>
                );
              }}
            />
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
                        source={{
                          uri:
                            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                        }}
                        style={styles.infoPicture}
                      />
                    </View>
                  </View>
                  <View style={styles.infoEmployeeRight}>
                    <Text style={styles.employeeName}>{employee}</Text>
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

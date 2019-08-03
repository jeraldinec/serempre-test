import React from "react";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StatusBar,
  TextInput,
  Modal
} from "react-native";
import {
  compose,
  lifecycle,
  pure,
  setDisplayName,
  withHandlers,
  withStateHandlers
} from "recompose";
import TaskCard from "../../components/taskCard";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-community/async-storage";
import { withState } from "recompose/dist/Recompose.cjs";
import { Formik } from "formik";
import UUIDGenerator from "react-native-uuid-generator";
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
} from "react-native-formik";
import * as Yup from "yup";
import styles from "./styles";

const white = "#fff";
const statusBar = "#3b3dbf";
const statusBarBlack = "#000";

const isSmallScreen = Dimensions.get("window").width < 360;

const hitSlop = { top: 15, bottom: 15, left: 15, right: 15 };

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextInput);
const Form = withNextInputAutoFocusForm(View);

const keyExtractor = item => item.id.toString();

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("El título es requerido")
    .max(32, "El título no debe ser mayor a 32 caracteres"),
  description: Yup.string().required("La descripción es requerida"),
  employee: Yup.string().required("El nombre del empleado es requerido"),
  time: Yup.string().required("El tiempo estimado es requerido")
});

const Home = compose(
  pure,
  withState("data", "setData", []),
  withState("completed", "setCompleted", 0),
  withState("pending", "setPending", 0),
  withStateHandlers(
    { visible: false },
    {
      toggleModal: ({ visible }) => () => ({
        visible: !visible
      })
    }
  ),
  withHandlers({
    renderItem: ({ setData }) => ({ item }) => (
      <TaskCard
        title={item.title}
        description={item.description}
        employee={item.employee}
        time={item.time}
        worked={item.worked}
        id={item.id}
        setData={setData}
      />
    )
  }),
  withHandlers({
    statistics: ({ data, setCompleted, setPending }) => () => {
      let foundCompleted = data.filter(function(el) {
        return el.time - el.worked <= 0;
      });
      if (foundCompleted) {
        setCompleted(foundCompleted.length);
      }
      let foundPending = data.filter(function(el) {
        return el.time - el.worked > 0;
      });
      if (foundPending) {
        setPending(foundPending.length);
      }
    }
  }),
  lifecycle({
    async componentDidMount() {
      const { setData } = this.props;
      try {
        let storage = await AsyncStorage.getItem("task");
        if (storage) {
          storage = JSON.parse(storage);
          if (storage.length > 0) {
            setData(storage);
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    componentDidUpdate(prevProps) {
      const { data, statistics } = this.props;
      if (prevProps.data !== data) {
        statistics();
      }
    }
  }),
  setDisplayName("Home")
)(({ visible, toggleModal, data, setData, renderItem, completed, pending }) => (
  <View style={styles.bigContainer}>
    <StatusBar backgroundColor={statusBar} barStyle="light-content" />
    <View style={styles.header}>
      <Text style={styles.headerText}>Adminsitrador de tareas</Text>
      <View style={styles.taskRow}>
        <View style={styles.taskLeft}>
          <Text style={styles.taskNumber}>{data.length}</Text>
          <Text style={styles.taskTitle}>Tareas</Text>
        </View>
        <View style={styles.taskCenter}>
          <Text style={styles.taskNumber}>{completed}</Text>
          <Text style={styles.taskTitle}>Completadas</Text>
        </View>
        <View style={styles.taskRight}>
          <Text style={styles.taskNumber}>{pending}</Text>
          <Text style={styles.taskTitle}>Pendientes</Text>
        </View>
      </View>
    </View>
    <View style={styles.listContainer}>
      {data.length > 0 ? (
        <FlatList
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
          keyboardShouldPersistTaps="always"
        />
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardText}>No tienes tareas registradas aún.</Text>
          <Text style={styles.cardText}>¡Crea una nueva tarea!</Text>
        </View>
      )}
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
          <Formik
            onSubmit={() => {}}
            validationSchema={validationSchema}
            render={({ values, errors, isValid }) => {
              return (
                <Form>
                  <MyInput
                    placeholder="Título de la tarea *"
                    name="title"
                    type="name"
                    style={styles.input}
                  />
                  <MyInput
                    placeholder="Descripción *"
                    name="description"
                    type="name"
                    style={styles.input}
                  />
                  <MyInput
                    placeholder="Nombre del empleado *"
                    name="employee"
                    type="name"
                    style={styles.input}
                  />
                  <MyInput
                    placeholder="Tiempo estimado (Horas) *"
                    name="time"
                    type="digits"
                    keyboardType="numeric"
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
                            if (storage.length > 0) {
                              values.worked = 0;
                              await UUIDGenerator.getRandomUUID().then(uuid => {
                                values.id = uuid;
                              });
                              storage.push(values);
                              AsyncStorage.setItem(
                                "task",
                                JSON.stringify(storage)
                              );
                              setData(storage);
                            } else {
                              let array = [];
                              values.worked = 0;
                              await UUIDGenerator.getRandomUUID().then(uuid => {
                                values.id = uuid;
                              });
                              array.push(values);
                              AsyncStorage.setItem(
                                "task",
                                JSON.stringify(array)
                              );
                              setData(array);
                            }
                          } else {
                            let array = [];
                            values.worked = 0;
                            await UUIDGenerator.getRandomUUID().then(uuid => {
                              values.id = uuid;
                            });
                            array.push(values);
                            AsyncStorage.setItem("task", JSON.stringify(array));
                            setData(array);
                          }
                          toggleModal();
                          // alert(JSON.stringify(values));
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
  </View>
));

export default Home;

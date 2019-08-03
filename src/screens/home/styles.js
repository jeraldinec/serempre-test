import { Dimensions, Platform, StyleSheet } from "react-native";

const ios = Platform.OS === "ios";

const white = "#fff";
const purple = "#4f52ff";
const black = "#333";
const grey = "#999";
const grey2 = "#555";
const grey3 = "#ccc";
const light = "#dedede";
const transparency = "rgba(0, 0, 0, .7)";

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
  buttonTextDisabled: {
    color: grey3,
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
  estimated: {
    alignItems: "center",
    flexDirection: "row"
  },
  estimatedLeft: {
    flex: 1
  },
  estimatedRight: {
    alignItems: "flex-end"
  },
  estimatedText: {
    color: grey2,
    fontSize: 13,
    marginRight: 8
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
    height: 200,
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
    fontSize: 14,
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 10
  },
  inputNumeric: {
    fontSize: 14,
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
  taskCenter: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  taskLeft: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  taskNumber: {
    color: white,
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 5,
    textAlign: "center"
  },
  taskRight: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  taskRow: {
    flexDirection: "row",
    marginTop: 25
  },
  taskTitle: {
    color: white,
    fontSize: 14,
    textAlign: "center"
  },
  titleModal: {
    color: black,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center"
  }
});

export default styles;

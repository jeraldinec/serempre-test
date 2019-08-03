import { Dimensions, Platform, StyleSheet } from "react-native";

const ios = Platform.OS === "ios";

const white = "#fff";
const purple = "#4f52ff";
const statusBarBlack = "#000";
const black = "#333";
const grey = "#999";
const grey2 = "#555";
const grey3 = "#ccc";
const light = "#dedede";
const green = "#39de8b";
const yellow = "#decd2b";
const transparency = "rgba(0, 0, 0, .7)";

const styles = StyleSheet.create({
  borderCompleted: {
    borderRightWidth: 5,
    borderRightColor: green
  },
  borderPending: {
    borderRightWidth: 5,
    borderRightColor: yellow
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
    marginTop: 50
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
    borderRadius: ios ? 12 : 100,
    height: 24,
    width: 24
  },
  pictureBorder: {
    alignItems: "center",
    borderColor: purple,
    borderRadius: ios ? 15 : 100,
    borderWidth: 1,
    height: 30,
    justifyContent: "center",
    width: 30
  },
  pictureContainer: {
    alignItems: "flex-end",
    flex: 0
  },
  time: {
    alignItems: "flex-start",
    flex: 1
  },
  timeCompleted: {
    alignItems: "center",
    backgroundColor: green,
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 4,
    paddingHorizontal: 8,
    paddingTop: 2
  },
  timePending: {
    alignItems: "center",
    backgroundColor: yellow,
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 4,
    paddingHorizontal: 8,
    paddingTop: 2
  },
  timeText: {
    color: white,
    fontSize: 12,
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

export default styles;

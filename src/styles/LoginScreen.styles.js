import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE6F2",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E87EB7",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 40,
  },
  welcome: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#A066D4",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  link: {
    fontSize: 14,
    color: "#A066D4",
    textDecorationLine: "underline",
  },
});

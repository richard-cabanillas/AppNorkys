import { StyleSheet } from "react-native";

export const styles =StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  appleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    marginBottom: 10,
  },
  appleText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "500",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    marginBottom: 20,
  },
  googleText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "500",
  },
  separator: {
    fontSize: 12,
    color: "#888",
    marginVertical: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  eyeIcon: {
    marginRight: 10,
  },
  forgotText: {
    alignSelf: "flex-end",
    color: "#888",
    marginBottom: 20,
    fontSize: 12,
  },
  loginButton: {
    backgroundColor: "#f15a29",
    paddingVertical: 14,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  fingerprintContainer: {
    marginBottom: 20,
  },
  registerText: {
    fontSize: 14,
    color: "#555",
  },
  registerLink: {
    color: "#f15a29",
    fontWeight: "600",
  },
});
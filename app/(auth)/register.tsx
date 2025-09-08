import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../../assets/images/fondo1.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#00ffaaff"
        translucent={false}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-200} // Para que los botones no tapen los campos de texto
      >
        <View style={[styles.container, { flex: 1.2 }]}>
          <Text style={styles.text}>¡REGÍSTRATE!</Text>
          <Text style={styles.text1}>Crea tu cuenta para continuar</Text>
          <Image
            source={require("../../assets/images/image.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.container}>
          <TextInput
            placeholder="✉️ Correo electrónico"
            style={styles.textInput}
          />
          <TextInput
            placeholder="👤 Nombre de usuario"
            style={styles.textInput}
          />
          <View style={{ width: "80%", position: "relative" }}>
            <TextInput
              placeholder="🔑 Contraseña"
              style={[styles.textInput, { width: "100%", paddingRight: 45 }]}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Text style={{ fontSize: 18 }}>{showPassword ? "🙈" : "👁️"}</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="🔑 Confirmar contraseña"
            style={styles.textInput}
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styleBottons.button}
              onPress={() => alert("Registro enviado")}
            >
              <Text style={styleBottons.text}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styleBottons.button}
              onPress={() => router.push("/(auth)/login")}
            >
              <Text style={styleBottons.text}>O iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#0fd190",
    textAlign: "left",
    marginInline: 30,
    marginTop: 60,
  },
  button: {
    width: 300,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBlock: 20,
  },
  textInput: {
    backgroundColor: "#0fd190",
    height: 60,
    borderColor: "gray",
    borderWidth: 2,
    marginTop: 20,
    paddingHorizontal: 10,
    width: "80%",
    borderRadius: 20,
    fontSize: 15,
  },
  text1: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffd503",
    textAlign: "left",
    marginInline: 30,
    marginTop: 10,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  eyeButton: {
    position: "absolute",
    right: 20,
    top: 30,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginRight: "10%",
    marginTop: 10,
  },
  forgotText: {
    color: "#ffd503",
    fontWeight: "bold",
    borderRadius: 10,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
});

const styleBottons = StyleSheet.create({
  button: {
    width: 300,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0fd190",
    padding: 10,
    borderRadius: 20,
    overflow: "hidden",
    marginBlock: 10,
  },
  text: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

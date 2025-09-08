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

export default function Index() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const router = useRouter();

  // <Link>
  // router.navigate("/(auth)/register")
  return (
    <ImageBackground
      source={require("../../assets/images/fondo1.jpg")} // Cambia la ruta a tu imagen
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <StatusBar
        barStyle="light-content" // Blanco (hora, señal, batería)
        backgroundColor="#00ffaaff" // Solo Android cambia fondo
        translucent={false}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={[styles.container, { flex: 1.2 }]}>
          <Text style={styles.text}>¡BIENVENIDO DE NUEVO!</Text>
          <Text style={styles.text1}>Ingresa tus datos para continuar</Text>
          <Image
            source={require("../../assets/images/image.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.container}>
          <TextInput
            placeholder="✉️ Correo electronico"
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
          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => router.push("/(auth)/reset")}
          >
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styleBottons.button}
              onPress={() => alert("Iniciar sesion")}
            >
              <Text style={styleBottons.text}>iniciar sesion</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styleBottons.button}
              onPress={() => router.push("/(auth)/register")}
            >
              <Text style={styleBottons.text}>O Registrarse</Text>
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
    backgroundColor: "#0fd190", //#08d334ff
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
    textShadowColor: "#000", // Color del contorno (negro)
    textShadowOffset: { width: 2, height: 2 }, // Desplazamiento del contorno
    textShadowRadius: 2, // Difuminado del contorno
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
    //backgroundColor: "#2749e0a9",
    borderRadius: 10,
    textShadowColor: "#000", // Color del contorno (negro)
    textShadowOffset: { width: 2, height: 2 }, // Desplazamiento del contorno
    textShadowRadius: 2, // Difuminado del contorno
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
//image, textinput, button

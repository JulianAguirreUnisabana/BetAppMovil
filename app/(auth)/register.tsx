import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Alert,
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
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register, isLoading } = useContext(AuthContext);
  const router = useRouter();

  const validateInputs = () => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor, ingresa un correo electrónico válido.");
      return false;
    }
    if (password.length < 8) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres.");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    const success = await register(email, password, username);
    if (success) {
      Alert.alert("Éxito", "Cuenta creada exitosamente.");
      router.push("/(auth)/login");
    } else {
      Alert.alert("Error", "Hubo un problema al crear tu cuenta.");
    }
  };

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
        keyboardVerticalOffset={-200}
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
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="👤 Nombre de usuario"
            style={styles.textInput}
            value={username}
            onChangeText={setUsername}
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
          <TouchableOpacity
            style={styleBottons.button}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styleBottons.text}>
              {isLoading ? "Cargando..." : "Registrarse"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styleBottons.button}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styleBottons.text}>O iniciar sesión</Text>
          </TouchableOpacity>
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
  image: {
    width: 150,
    height: 150,
    marginBlock: 20,
  },
  eyeButton: {
    position: "absolute",
    right: 20,
    top: 30,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
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

import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  return (
    <ImageBackground
      source={require("../assets/images/fondo1.jpg")} // Cambia la ruta a tu imagen
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <StatusBar
        barStyle="dark-content" // Blanco (hora, señal, batería)
        backgroundColor="#00ffaaff" // Solo Android cambia fondo
        translucent={false}
      />
      <View style={[styles.container, { flex: 1.2 }]}>
        <Text style={styles.text}>¡BIENVENIDO DE NUEVO!</Text>
        <Text style={styles.text1}>Ingresa tus datos para continuar</Text>
        <Image
          source={require("../assets/images/image.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder="✉️ Correo electronico"
          style={styles.textInput}
        />
        <TextInput placeholder="🔑 Contraseña" style={styles.textInput} />
      </View>
      <View style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styleBottons.button}
            onPress={() => alert("Iniciar sesion")}
          >
            <Text style={styleBottons.text}>iniciar sesion</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    fontWeight: "normal",
    color: "#ffd503",
    textAlign: "left",
    marginInline: 30,
    marginTop: 10,
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
    overflow: "hidden", // Necesario para que el borderRadius funcione en Android
  },
  text: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
//image, textinput, button

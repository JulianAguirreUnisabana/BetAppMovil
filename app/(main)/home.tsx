import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const juegos = [
    {
      id: "1",
      nombre: "Ruleta",
      imagen: require("../../assets/images/Ruleta.jpeg"),
    },
    {
      id: "2",
      nombre: "Blackjack",
      imagen: require("../../assets/images/blackjack.jpg"),
    },
    {
      id: "3",
      nombre: "Poker",
      imagen: require("../../assets/images/poker.jpeg"),
    },
    {
      id: "4",
      nombre: "Tragamonedas",
      imagen: require("../../assets/images/Tragamonedas.jpg"),
    },
  ];
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
      >
        <View style={[styles.container, { flex: 0.6 }]}>
          <Text style={styles.text}>Bienvenido a BetApp</Text>
          <Text style={styles.text1}>Elige un juego y comienza a apostar!</Text>
        </View>
        <View style={styles.container}>
          <FlatList
            data={juegos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styleBottons.button2}>
                <ImageBackground
                  source={item.imagen}
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20,
                    overflow: "hidden",
                  }}
                  imageStyle={{ borderRadius: 20 }}
                >
                  <Text style={styleBottons.text}>{item.nombre}</Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ alignItems: "center" }}
          />
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
    marginTop: 30,
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
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
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
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffd503",
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button2: {
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 20,
    overflow: "hidden",
    marginBlock: 10,
  },
});

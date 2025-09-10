import { Ionicons } from "@expo/vector-icons";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const estadisticas: {
  id: string;
  label: string;
  value: number | string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}[] = [
  { id: "1", label: "Apuestas ganadas", value: 12, icon: "trophy-outline" },
  {
    id: "2",
    label: "Apuestas perdidas",
    value: 8,
    icon: "close-circle-outline",
  },
  { id: "3", label: "Total apostado", value: "$1500", icon: "cash-outline" },
  {
    id: "4",
    label: "Mejor juego",
    value: "Ruleta",
    icon: "game-controller-outline",
  },
];

export default function Profile() {
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
        <View style={[styles.container, { flex: 0.4 }]}>
          <Text style={styles.text}>Perfil de usuario</Text>
          <Text style={styles.text1}>
            Aquí puedes ver y editar tu información
          </Text>
        </View>
        <View style={[styles.container, { flex: 0.7 }]}>
          <Ionicons name="person-circle-outline" size={100} color="#0fd190" />
          <Text style={styles.text1}>Nombre: Juan Pérez</Text>
          <Text style={styles.text1}>Correo: juanperez@email.com</Text>
          <View style={styles.statsContainer}>
            {estadisticas.map((item) => (
              <View key={item.id} style={styles.statItem}>
                <Ionicons
                  name={item.icon}
                  size={28}
                  color="#0fd190"
                  style={{ marginRight: 10 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.statLabel}>{item.label}</Text>
                  <Text style={styles.statValue}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.container, { flex: 0.4 }]}>
          <TouchableOpacity style={styleBottons.button}>
            <Text style={styleBottons.text}>Editar perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styleBottons.button}>
            <Text style={styleBottons.text}>Cerrar sesión</Text>
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#0fd190",
    textAlign: "center",
    marginBottom: 5,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    width: 300,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 20,
    marginVertical: 8,
    elevation: 2,
    shadowColor: "#0fd190",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
    textAlign: "center",
    marginTop: 10,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statsContainer: {
    width: "100%",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
    marginTop: 10,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  statLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffd503",
    marginTop: 10,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0fd190",
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
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 20,
    overflow: "hidden",
    marginBlock: 10,
  },
  text2: {
    color: "#0fd190",
    fontSize: 16,
    fontWeight: "bold",
  },
});

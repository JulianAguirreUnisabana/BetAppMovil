import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import {
  Alert,
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
import { AuthContext } from "../../contexts/AuthContext";

const estadisticas = [
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
  const { user, updateProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    username: user?.username || "",
    bio: user?.bio || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
  });

  const handleSave = async () => {
    const success = await updateProfile(profile);
    if (success) {
      Alert.alert("Éxito", "Perfil actualizado correctamente.");
      setIsEditing(false);
    } else {
      Alert.alert("Error", "No se pudo actualizar el perfil.");
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
        <View style={[styles.container, { flex: 0.4 }]}>
          <Text style={styles.text}>Perfil de usuario</Text>
          <Text style={styles.text1}>
            {isEditing
              ? "Edita tu información"
              : "Aquí puedes ver tu información"}
          </Text>
        </View>
        <View style={[styles.container, { flex: 0.7 }]}>
          <Ionicons name="person-circle-outline" size={100} color="#0fd190" />
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={profile.name}
                onChangeText={(text) => setProfile({ ...profile, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={profile.username}
                onChangeText={(text) =>
                  setProfile({ ...profile, username: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Biografía"
                value={profile.bio}
                onChangeText={(text) => setProfile({ ...profile, bio: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Teléfono"
                keyboardType="phone-pad"
                value={profile.phone}
                onChangeText={(text) => setProfile({ ...profile, phone: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Género"
                value={profile.gender}
                onChangeText={(text) =>
                  setProfile({ ...profile, gender: text })
                }
              />
            </>
          ) : (
            <>
              <Text style={styles.text1}>Nombre: {user?.name || "N/A"}</Text>
              <Text style={styles.text1}>Correo: {user?.email || "N/A"}</Text>
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
            </>
          )}
        </View>
        <View style={[styles.container, { flex: 0.4 }]}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={styleBottons.button}
                onPress={handleSave}
              >
                <Text style={styleBottons.text}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleBottons.button}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styleBottons.text}>Cancelar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styleBottons.button}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styleBottons.text}>Editar perfil</Text>
            </TouchableOpacity>
          )}
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
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "80%",
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
});

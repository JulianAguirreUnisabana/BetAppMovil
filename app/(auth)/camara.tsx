import { Ionicons } from "@expo/vector-icons";
import {
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CustomCameraProps = {
  onPictureTaken: (uri: string) => void;
  onClose: () => void;
};

export default function CustomCamera({
  onPictureTaken,
  onClose,
}: CustomCameraProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [type, setType] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    // Aún no pidió permisos
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "white", marginBottom: 10 }}>
          Necesitamos permiso para usar la cámara
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionButton}
        >
          <Text style={{ color: "white" }}>Dar permisos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo?.uri) {
          onPictureTaken(photo.uri);
          onClose();
        }
      } catch (e) {
        console.error("Error al tomar la foto:", e);
      }
    }
  };

  const pickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onPictureTaken(result.assets[0].uri);
        onClose();
      }
    } catch (e) {
      console.error("Error al abrir galería:", e);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <CameraView
        style={{ flex: 1 }}
        ref={cameraRef}
        facing={type}
        flash={flash}
      >
        <View style={styles.controls}>
          {/* Botón tomar foto */}
          <TouchableOpacity onPress={takePicture} style={styles.iconButton}>
            <Ionicons name="camera" size={28} color="white" />
          </TouchableOpacity>

          {/* Botón cambiar cámara */}
          <TouchableOpacity
            onPress={() => setType(type === "back" ? "front" : "back")}
            style={styles.iconButton}
          >
            <Ionicons name="camera-reverse" size={28} color="white" />
          </TouchableOpacity>

          {/* Botón flash */}
          <TouchableOpacity
            onPress={() => setFlash(flash === "off" ? "on" : "off")}
            style={styles.iconButton}
          >
            <Ionicons
              name={flash === "off" ? "flash-off" : "flash"}
              size={28}
              color="white"
            />
          </TouchableOpacity>

          {/* Botón galería */}
          <TouchableOpacity onPress={pickFromGallery} style={styles.iconButton}>
            <Ionicons name="images" size={28} color="white" />
          </TouchableOpacity>

          {/* Botón cerrar */}
          <TouchableOpacity onPress={onClose} style={styles.iconButton}>
            <Ionicons name="close" size={28} color="red" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 12,
    position: "absolute",
    bottom: 0,
    width: "100%",
    marginBottom: 50,
  },
  iconButton: {
    padding: 10,
  },
  center: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  permissionButton: {
    backgroundColor: "#0fd190",
    padding: 12,
    borderRadius: 8,
  },
});

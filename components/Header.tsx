import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { storage, useGetProfile } from "@/services";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { PoppinsItalic, PoppinsBold } from "@/constant";

export default function Header() {
  function onSignOut() {
    const signOut = () => {
      storage.clearAll();
      router.replace("/auth/sign-in");
    };

    if (Platform.OS !== "web") {
      Alert.alert("Keluar?", "Sesi Anda akan berakhir.", [
        { text: "Batal", style: "cancel" },
        {
          text: "Keluar",
          onPress: () => signOut(),
          isPreferred: true,
          style: "destructive",
        },
      ]);
    } else {
      const confirm = window.confirm("Keluar? Sesi Anda akan berakhir");
      confirm && signOut();
    }
  }

  const [username, setUsername] = useState("User Name");
  const getProfile = useGetProfile();
  useEffect(() => {
    getProfile().then((username) => setUsername(username));
  }, []);

  return (
    <View style={styles.viewHeader}>
      <TouchableOpacity style={styles.btnSignOut} onPress={onSignOut}>
        <Icon name="logout" color={"white"} size={35} />
      </TouchableOpacity>
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <Text style={{ color: "white", fontFamily: PoppinsItalic }}>Hai,</Text>
        <Text style={styles.textUsername}>{username}</Text>
      </View>
      <View style={{ ...styles.btnSignOut, transform: [{ rotate: "0deg" }] }}>
        <Icon name="account-circle" color={"white"} size={40} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewHeader: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    marginTop: 10,
  },
  textUsername: {
    color: "white",
    fontSize: 18,
    fontFamily: PoppinsBold,
  },
  btnSignOut: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "180deg" }],
  },
});

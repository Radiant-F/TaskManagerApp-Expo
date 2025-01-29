import { Text, View, StyleSheet, Image, Platform } from "react-native";
import { Background } from "@/components";
import { useEffect } from "react";
import { useRefreshSession } from "@/services";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const refreshSession = useRefreshSession();
  const [loaded, error] = useFonts({
    PoppinsRegular: require("@/assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("@/assets/fonts/Poppins-Bold.ttf"),
    PoppinsItalic: require("@/assets/fonts/Poppins-Italic.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      refreshSession();
    }
  }, [loaded]);

  return (
    <View style={styles.container}>
      <Background opacity={1} />
      <Image
        source={require("@/assets/icon-app-transparent.png")}
        style={{ width: 150, height: 150 }}
        resizeMethod="resize"
        resizeMode="contain"
      />
      <Text style={styles.textVersion}>v0.0.1-alpha-rc</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textVersion: {
    color: "white",
    position: "absolute",
    bottom: Platform.OS == "ios" ? 20 : 0,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

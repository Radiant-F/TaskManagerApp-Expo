import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Background({ opacity = 1 }: { opacity: number }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/background.png")}
        style={{ width: "100%", height: "100%", opacity }}
        resizeMethod="resize"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
});

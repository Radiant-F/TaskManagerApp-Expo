import { Background, FormInput, Gap } from "@/components";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import CheckBox from "expo-checkbox";
import { router } from "expo-router";
import { useSignIn } from "@/services";

export default function SignIn() {
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, signIn } = useSignIn();

  return (
    <View style={styles.container}>
      <Background opacity={0.75} />
      <Text style={styles.textTitle}>Sign In</Text>
      <Gap height={20} />
      <View style={styles.viewContent}>
        {/* form input */}
        <FormInput
          title="Email"
          icon="email"
          placeholder="contoh@email.com"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}
        />
        <Gap height={10} />
        <FormInput
          title="Password"
          icon="lock"
          placeholder="Kata sandi..."
          autoCapitalize="none"
          password={true}
          onChangeText={(password) => setPassword(password)}
        />

        {/* button remember me */}
        <Pressable
          style={styles.viewRememberMe}
          onPress={() => setRemember(!remember)}
        >
          <CheckBox
            value={remember}
            color={remember ? undefined : "white"}
            onValueChange={() => setRemember(!remember)}
          />
          <Gap width={5} />
          <Text style={{ color: "white" }}>Ingat Saya</Text>
        </Pressable>

        <Gap height={15} />

        {/* button action */}
        <TouchableOpacity
          style={styles.btnAction}
          activeOpacity={0.75}
          onPress={() => signIn({ credential: { email, password }, remember })}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={"white"} size={"small"} />
          ) : (
            <Text style={styles.textBtnTitle}>Masuk</Text>
          )}
        </TouchableOpacity>
        <Gap height={10} />
        <TouchableOpacity
          disabled={loading}
          onPress={() => router.navigate("/auth/sign-up")}
          activeOpacity={0.75}
          style={{
            ...styles.btnAction,
            backgroundColor: "#9A4242",
            width: "50%",
          }}
        >
          <Text style={styles.textBtnTitle}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textBtnTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  btnAction: {
    backgroundColor: "#00677E",
    height: 45,
    borderRadius: 45 / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { height: 3, width: 2 },
    shadowRadius: 1.5,
    shadowOpacity: 0.25,
    elevation: 3,
    width: "80%",
    alignSelf: "center",
  },
  viewRememberMe: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginVertical: 10,
  },
  viewContent: {
    backgroundColor: "#ffffff40",
    width: "85%",
    padding: 30,
    borderRadius: 30,
    maxWidth: 520,
  },
  textTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

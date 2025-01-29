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
import { useSignUp } from "@/services";
import { PoppinsBold, PoppinsRegular } from "@/constant";

export default function SignUp() {
  const [remember, setRemember] = useState(false);

  const { loading, signUp } = useSignUp();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.container}>
      <Background opacity={0.75} />
      <Text style={styles.textTitle}>Sign Up</Text>
      <Gap height={20} />
      <View style={styles.viewContent}>
        {/* form input */}
        <FormInput
          title="Nama"
          icon="account"
          placeholder="Nama Anda..."
          autoCapitalize="words"
          onChangeText={setUsername}
        />
        <Gap height={10} />
        <FormInput
          title="Email"
          icon="email"
          placeholder="contoh@email.com"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <Gap height={10} />
        <FormInput
          title="Password"
          icon="lock"
          placeholder="Kata sandi..."
          autoCapitalize="none"
          password={true}
          onChangeText={setPassword}
        />
        <Gap height={10} />
        <FormInput
          title="Confirm Password"
          icon="lock"
          placeholder="Kata sandi..."
          autoCapitalize="none"
          password={true}
          onChangeText={setConfirmPassword}
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
          <Text style={{ color: "white", fontFamily: PoppinsRegular }}>
            Ingat Saya
          </Text>
        </Pressable>

        <Gap height={15} />

        {/* button action */}
        <TouchableOpacity
          style={styles.btnAction}
          activeOpacity={0.75}
          disabled={loading}
          onPress={() => {
            signUp({
              credential: { email, username, confirmPassword, password },
              remember,
            });
          }}
        >
          {loading ? (
            <ActivityIndicator color={"white"} size={"small"} />
          ) : (
            <Text style={styles.textBtnTitle}>Daftar</Text>
          )}
        </TouchableOpacity>
        <Gap height={10} />
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.75}
          disabled={loading}
          style={{
            ...styles.btnAction,
            backgroundColor: "#9A4242",
            width: "50%",
          }}
        >
          <Text style={styles.textBtnTitle}>Kembali</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textBtnTitle: {
    color: "white",
    fontSize: 16,
    fontFamily: PoppinsBold,
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
    fontFamily: PoppinsBold,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

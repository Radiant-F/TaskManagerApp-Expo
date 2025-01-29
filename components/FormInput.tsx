import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import Gap from "./Gap";
import { useState } from "react";

type Props = {
  onChangeText?: (text: string) => void;
  password?: boolean;
  title?: string;
  icon?: keyof typeof Icon.glyphMap;
  placeholder?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  keyboardType?: KeyboardTypeOptions;
};

export default function FormInput({
  onChangeText,
  password,
  title = "Name Input",
  icon = "ab-testing",
  placeholder = "Text input...",
  autoCapitalize,
  keyboardType,
}: Props) {
  const [secure, setSecure] = useState(true);

  return (
    <View>
      <Text style={styles.textInputTitle}>{title}</Text>
      <View style={styles.viewInput}>
        <Icon name={icon} size={25} color={"black"} />
        <Gap width={5} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"grey"}
          secureTextEntry={password && secure}
          style={{ flex: 1, height: 50 }}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
        />
        {password && (
          <TouchableOpacity
            style={styles.btnEye}
            onPress={() => setSecure(!secure)}
          >
            <Icon name={secure ? "eye-off" : "eye"} color={"black"} size={25} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputTitle: {
    color: "white",
    fontWeight: "bold",
    marginVertical: 5,
  },
  btnEye: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewInput: {
    backgroundColor: "white",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50 / 2,
    paddingHorizontal: 15,
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { height: 2, width: 2 },
    shadowRadius: 1.5,
    shadowOpacity: 0.25,
  },
});

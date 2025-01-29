import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import Gap from "./Gap";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { PoppinsBold, PoppinsRegular } from "@/constant";

type Props = {
  visible?: boolean;
  onRequestClose?: () => void;
  forUpdate?: boolean;
  onChangeTitle?: (title: string) => void;
  onChangeDesc?: (desc: string) => void;
  onSubmit?: () => void;
  valueTitle?: string;
  valueDesc?: string;
  loading?: boolean;
};

export default function ModalTask({
  onRequestClose,
  visible,
  forUpdate,
  onChangeTitle,
  onChangeDesc,
  onSubmit,
  valueTitle = "",
  valueDesc = "",
  loading,
}: Props) {
  const textCounterStyle = (type: string, minimum: number): TextStyle => ({
    color: type.length < minimum ? "tomato" : "white",
    textAlign: "right",
  });

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainer}>
        <Pressable style={styles.modalBackdrop} onPress={onRequestClose} />
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Icon name="lead-pencil" color={"white"} size={25} />
            <Text style={{ color: "white", fontFamily: PoppinsRegular }}>
              {forUpdate ? "Update" : "Buat"} Tugas
            </Text>
            <TouchableOpacity onPress={onRequestClose}>
              <Icon name="close-circle-outline" color={"white"} size={25} />
            </TouchableOpacity>
          </View>

          <Gap height={20} />

          <View style={{ paddingHorizontal: 10 }}>
            <Text style={styles.textInputTitle}>Title</Text>
            <View style={styles.viewInput}>
              <Icon name="text-short" size={25} color={"black"} />
              <Gap width={5} />
              <TextInput
                placeholder="Task title..."
                placeholderTextColor={"grey"}
                style={styles.input}
                onChangeText={onChangeTitle}
                value={valueTitle}
              />
            </View>
            <Text style={textCounterStyle(valueTitle, 3)}>
              {valueTitle.length}/255
            </Text>
            <Text style={styles.textInputTitle}>Description</Text>
            <View style={styles.viewInput}>
              <Icon name="text" size={25} color={"black"} />
              <Gap width={5} />
              <TextInput
                placeholder="Task description..."
                placeholderTextColor={"grey"}
                style={styles.input}
                onChangeText={onChangeDesc}
                value={valueDesc}
              />
            </View>
            <Text style={textCounterStyle(valueDesc, 25)}>
              {valueDesc.length}/255
            </Text>
          </View>

          <TouchableOpacity
            style={styles.modalBtnCreate}
            onPress={onSubmit}
            activeOpacity={0.75}
          >
            {loading ? (
              <ActivityIndicator color={"white"} size={"small"} />
            ) : (
              <Text style={styles.modalTextCreate}>
                {forUpdate ? "Update" : "Tambah"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 50,
    fontFamily: PoppinsRegular,
    paddingTop: 2.5,
  },
  modalTextCreate: {
    color: "white",
    fontSize: 15,
    fontFamily: PoppinsBold,
  },
  modalBtnCreate: {
    backgroundColor: "#00677E",
    alignSelf: "center",
    width: 120,
    height: 45,
    borderRadius: 45 / 2,
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { height: 2, width: 2 },
    shadowRadius: 1.5,
    shadowOpacity: 0.25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
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
  textInputTitle: {
    color: "white",
    fontFamily: PoppinsBold,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalContent: {
    backgroundColor: "#164877",
    width: "85%",
    padding: 20,
    borderRadius: 30,
    shadowColor: "black",
    shadowOffset: { height: 3, width: 2 },
    shadowRadius: 1.5,
    shadowOpacity: 0.25,
    elevation: 5,
  },
  modalBackdrop: {
    position: "absolute",
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    opacity: 0.25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

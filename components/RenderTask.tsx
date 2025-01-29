import Checkbox from "expo-checkbox";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import Gap from "./Gap";
import { PoppinsBold, PoppinsRegular } from "@/constant";

type Props = {
  item: { _id: string; title: string; desc: string; checked: boolean };
  onChecklist: () => void;
  onPressExpand: () => void;
  selectedId: string | number;
  onPressDelete: () => void;
  onPressUpdate: () => void;
};

export default function RenderTask({
  item,
  onChecklist,
  onPressExpand,
  selectedId,
  onPressDelete,
  onPressUpdate,
}: Props) {
  return (
    <View style={styles.containerTask}>
      <View style={styles.viewTask}>
        <Checkbox
          color={item.checked ? undefined : "white"}
          value={item.checked}
          onValueChange={onChecklist}
        />
        <Text style={styles.textTaskTitle}>{item.title}</Text>
        <TouchableOpacity
          style={styles.btnExpand}
          activeOpacity={0.75}
          onPress={onPressExpand}
        >
          <Icon
            name={item._id == selectedId ? "chevron-up" : "chevron-down"}
            color={"white"}
            size={25}
          />
        </TouchableOpacity>
      </View>
      {item._id == selectedId && (
        <View>
          <Text style={styles.textTaskDesc}>{item.desc}</Text>
          <View style={styles.btnOption}>
            <TouchableOpacity
              style={styles.btnDelete}
              activeOpacity={0.75}
              onPress={onPressDelete}
            >
              <Icon name="trash-can" color={"white"} size={20} />
            </TouchableOpacity>
            <Gap width={10} />
            <TouchableOpacity
              style={styles.btnUpdate}
              activeOpacity={0.75}
              onPress={onPressUpdate}
            >
              <Icon name="lead-pencil" color={"white"} size={20} />
              <Gap width={5} />
              <Text style={{ color: "white", fontFamily: PoppinsRegular }}>
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textTaskDesc: {
    color: "white",
    marginVertical: 10,
    fontFamily: PoppinsRegular,
  },
  btnOption: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btnUpdate: {
    height: 35,
    backgroundColor: "#00677E",
    borderRadius: 35 / 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingRight: 15,
    shadowColor: "black",
    shadowOffset: { height: 3, width: 2 },
    shadowRadius: 1.5,
    shadowOpacity: 0.25,
    elevation: 3,
  },
  btnDelete: {
    width: 35,
    height: 35,
    backgroundColor: "#9A4242",
    borderRadius: 35 / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { height: 3, width: 2 },
    shadowRadius: 1.5,
    shadowOpacity: 0.25,
    elevation: 3,
  },
  viewTask: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnExpand: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000040",
    borderRadius: 45 / 2,
  },
  textTaskTitle: {
    color: "white",
    fontSize: 18,
    flex: 1,
    marginHorizontal: 20,
    textAlign: "right",
    fontFamily: PoppinsBold,
  },
  viewLine: {
    backgroundColor: "white",
    width: "80%",
    height: 1,
    alignSelf: "center",
    transform: [{ rotate: "-2.5deg" }],
    marginVertical: 5,
  },
  containerTask: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "white",
    padding: 20,
  },
});

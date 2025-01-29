import { Background, Gap, ModalTask, Header, RenderTask } from "@/components";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
  Platform,
  Alert,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import {
  useChecklistTask,
  useCreateTask,
  useDeleteTask,
  useGetTasks,
  useUpdateTask,
} from "@/services";

export type TaskType = {
  _id: string;
  title: string;
  desc: string;
  checked: boolean;
};

export default function Home() {
  const insets = useSafeAreaInsets();

  const [selectedId, setSelectedId] = useState<string | number>(0);

  const { loading, tasks, getTasks } = useGetTasks();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const {
    closeModalCreate,
    createTask,
    loading: creating,
    modalCreate,
    setModalCreate,
  } = useCreateTask();

  const { deleteTask, loading: deleting } = useDeleteTask();
  async function onDeleteTask(id: string) {
    if (Platform.OS != "web")
      Alert.alert("Hapus Tugas?", "Tindakan ini tidak bisa diulangi.", [
        { text: "Batal" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            await deleteTask(id);
            getTasks();
          },
        },
      ]);
    else {
      const confirm = window.confirm(
        "Hapus tugas? Tindakan tidak dapat diulangi."
      );
      if (confirm) {
        await deleteTask(id);
        getTasks();
      }
    }
  }

  const { checklistTask, loading: marking } = useChecklistTask();

  const [editedTask, setEditedTask] = useState<TaskType>({
    _id: "",
    checked: false,
    desc: "",
    title: "",
  });
  const {
    closeModalUpdate,
    loading: updating,
    modalUpdate,
    updateTask,
    setModalUpdate,
  } = useUpdateTask();

  return (
    <View style={{ flex: 1 }}>
      <Background opacity={0.75} />

      <Gap height={insets.top} />

      <Header />

      <View style={styles.viewLine} />

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading || deleting || marking}
            onRefresh={() => getTasks()}
          />
        }
        ListEmptyComponent={
          <Text style={styles.textEmpty}>Task is empty. Create one!</Text>
        }
        contentContainerStyle={styles.container}
        data={tasks}
        renderItem={({ item }) => {
          return (
            <RenderTask
              item={item}
              onChecklist={async () => {
                await checklistTask(item._id, item.checked);
                getTasks();
              }}
              onPressExpand={() =>
                setSelectedId(item._id == selectedId ? 0 : item._id)
              }
              selectedId={selectedId}
              onPressDelete={async () => onDeleteTask(item._id)}
              onPressUpdate={() => {
                setEditedTask(item);
                setModalUpdate(true);
              }}
            />
          );
        }}
      />

      <View style={styles.viewLine} />

      <TouchableOpacity
        style={styles.btnCreate}
        activeOpacity={0.75}
        onPress={() => setModalCreate(true)}
      >
        <Icon name="plus-circle-outline" color={"white"} size={25} />
        <Text style={styles.textCreate}>Tambah</Text>
      </TouchableOpacity>

      <Gap height={insets.bottom + 20} />

      <ModalTask
        visible={modalCreate}
        onRequestClose={closeModalCreate}
        onChangeDesc={setDesc}
        onChangeTitle={setTitle}
        onSubmit={async () => {
          await createTask(title, desc);
          getTasks();
        }}
        valueTitle={title}
        valueDesc={desc}
        loading={creating}
      />

      <ModalTask
        visible={modalUpdate}
        onRequestClose={closeModalUpdate}
        forUpdate
        valueTitle={editedTask.title}
        valueDesc={editedTask.desc}
        onChangeTitle={(title) =>
          setEditedTask({ ...editedTask, title: title })
        }
        onChangeDesc={(desc) => setEditedTask({ ...editedTask, desc: desc })}
        onSubmit={async () => {
          await updateTask(editedTask);
          getTasks();
        }}
        loading={updating}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textEmpty: {
    color: "white",
    opacity: 0.5,
    textAlign: "center",
    fontStyle: "italic",
    marginVertical: 20,
  },
  textCreate: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  btnCreate: {
    backgroundColor: "#00677E",
    alignSelf: "center",
    height: 50,
    width: 150,
    borderRadius: 50 / 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { height: 3, width: 2 },
    shadowRadius: 1.5,
    shadowOpacity: 0.25,
    elevation: 3,
    marginTop: -30,
  },
  viewLine: {
    backgroundColor: "white",
    width: "80%",
    height: 1,
    alignSelf: "center",
    transform: [{ rotate: "-2.5deg" }],
    marginVertical: 5,
  },
  container: {
    padding: 20,
    paddingHorizontal: 30,
    maxWidth: 520,
    alignSelf: "center",
    width: "100%",
  },
});

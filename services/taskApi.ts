import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { storage } from "./MMKV";
import { router } from "expo-router";

const instance = () => {
  const token = storage.getString("token");
  return axios.create({
    baseURL: "https://todo-api-omega.vercel.app/api/v1",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

type SignInProps = {
  credential: { email: string; password: string };
  remember: boolean;
};
export function useSignIn() {
  const [loading, setLoading] = useState<boolean>(false);

  async function signIn({ credential, remember }: SignInProps) {
    setLoading(true);
    try {
      const response = await instance().post("/auth/login", credential);
      storage.set("token", response.data.user.token);

      if (remember) {
        Platform.OS !== "web" && storage.recrypt("user.credentials");
        storage.set("user.credentials", JSON.stringify(credential));
      }

      router.replace("/home");
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error)) {
        console.log("error response:", error.response?.data);
        Alert.alert("Gagal Masuk", "Pastikan email dan password benar.");
        Platform.OS === "web" &&
          window.alert("Pastikan email dan password benar.");
      } else console.log("error syntax:", error);
    }
  }

  return { loading, signIn };
}

type SignUpProps = {
  credential: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  remember: boolean;
};
export function useSignUp() {
  const [loading, setLoading] = useState(false);

  async function signUp({ credential, remember }: SignUpProps) {
    setLoading(true);
    try {
      const response = await instance().post("/auth/register", credential);
      storage.set("token", response.data.user.token);

      if (remember) {
        Platform.OS !== "web" && storage.recrypt("user.credentials");
        storage.set(
          "user.credentials",
          JSON.stringify({
            email: credential.email,
            password: credential.password,
          })
        );
      }

      router.dismissAll();
      router.dismissTo("/home");
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("error response:", error.response?.data);
        Alert.alert("Gagal Daftar", error.response?.data.message);
      } else console.log("error syntax:", error);
      setLoading(false);
    }
  }

  return { loading, signUp };
}

type TaskType = {
  _id: string;
  title: string;
  desc: string;
  checked: boolean;
};
export function useGetTasks() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskType[]>([]);

  async function getTasks() {
    setLoading(true);
    try {
      const response = await instance().get("/todos");
      setTasks(response.data.data.todos);
      setLoading(false);
    } catch (error) {
      console.log("error get tasks:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return { loading, tasks, getTasks };
}

export function useCreateTask() {
  const [loading, setLoading] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const closeModalCreate = () => setModalCreate(false);

  async function createTask(title: string, desc: string) {
    setLoading(true);
    try {
      await instance().post("/todos", {
        title: title,
        desc: desc,
      });
      setLoading(false);
      setModalCreate(false);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("error response:", error.response?.data);
        if (Platform.OS == "web") window.alert(error.response?.data.message);
        else Alert.alert("", error.response?.data.message);
      } else console.log("error syntax:", error);
      setLoading(false);
    }
  }

  return { loading, createTask, modalCreate, setModalCreate, closeModalCreate };
}

export function useDeleteTask() {
  const [loading, setLoading] = useState<boolean>(false);

  async function deleteTask(id: string) {
    setLoading(true);
    try {
      await instance().delete(`/todos/${id}`);
      setLoading(false);
    } catch (error) {
      console.log("error:", error);
      setLoading(false);
    }
  }

  return { loading, deleteTask };
}

export function useChecklistTask() {
  const [loading, setLoading] = useState(false);

  async function checklistTask(id: string, checked: boolean) {
    setLoading(true);
    try {
      await instance().put(`/todos/${id}`, {
        checked: !checked,
      });
      setLoading(false);
    } catch (error) {
      console.log("error:", error);
      setLoading(false);
    }
  }

  return { loading, checklistTask };
}

export function useUpdateTask() {
  const [loading, setLoading] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const closeModalUpdate = () => setModalUpdate(false);

  async function updateTask(editedTask: TaskType) {
    setLoading(true);
    try {
      await instance().put(`/todos/${editedTask._id}`, editedTask);
      setLoading(false);
      closeModalUpdate();
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("error response:", error.response?.data.message);
        if (Platform.OS != "web") Alert.alert("", error.response?.data.message);
        else window.alert(error.response?.data.message);
      } else console.log("error syntax:", error);
      setLoading(false);
    }
  }

  return { loading, updateTask, modalUpdate, closeModalUpdate, setModalUpdate };
}

export function useRefreshSession() {
  async function refreshSession() {
    try {
      const credentials = storage.getString("user.credentials");
      if (credentials) {
        const response = await instance().post(
          "/auth/login",
          JSON.parse(credentials)
        );
        storage.set("token", response.data.user.token);

        router.replace("/home");
      } else {
        setTimeout(() => {
          router.replace("/auth/sign-in");
        }, 1500);
      }
    } catch (error) {
      console.log("error checking session:", error);
      router.replace("/auth/sign-in");
    }
  }

  return refreshSession;
}

export function useGetProfile() {
  async function getProfile() {
    try {
      const response = await instance().get("/profile");

      return response.data.user.username;
    } catch (error: any) {
      console.log("error get profile:", error);
      return JSON.stringify(error.message);
    }
  }

  return getProfile;
}

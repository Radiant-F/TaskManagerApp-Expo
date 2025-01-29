const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.exkoi.dev.TaskManagerApp.dev";
  }

  if (IS_PREVIEW) {
    return "com.exkoi.dev.TaskManagerApp.preview";
  }

  return "com.exkoi.dev.TaskManagerApp";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Task Manager (Dev)";
  }

  if (IS_PREVIEW) {
    return "Task Manager (Preview)";
  }

  return "Task Manager: Expo App";
};

export default {
  expo: {
    name: getAppName(),
    slug: "TaskManagerApp",
    version: "1.0.0-preview-rc",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: getUniqueIdentifier(),
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: getUniqueIdentifier(),
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/Poppins-Regular.ttf",
            "./assets/fonts/Poppins-Bold.ttf",
            "./assets/fonts/Poppins-Italic.ttf",
          ],
        },
      ],
      [
        "expo-build-properties",
        {
          android: {
            enableProguardInReleaseBuilds: true,
          },
        },
      ],
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "4ad61749-226f-4a07-ad2b-99d290d54088",
      },
    },
    owner: "exkoi.dev",
  },
};

import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.saintvision.saintsal",
  appName: "SaintSal™",
  webDir: "out",
  bundledWebRuntime: false,
  server: {
    url: "https://saintvisionai.com",
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#000000",
      showSpinner: true,
      spinnerColor: "#D4AF37",
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#D4AF37",
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#000000",
    },
    Keyboard: {
      resize: "body",
      style: "DARK",
    },
    App: {
      launchUrl: "https://saintvisionai.com/en",
    },
  },
  ios: {
    scheme: "SaintSal",
    contentInset: "automatic",
    scrollEnabled: true,
    backgroundColor: "#000000",
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
      keystorePassword: undefined,
      releaseType: "AAB",
      signingType: "apksigner",
    },
    backgroundColor: "#000000",
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },
};

export default config;

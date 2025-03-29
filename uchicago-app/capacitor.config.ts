import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.uchicagodining.app",
  appName: "UChicago Dining",
  webDir: "out",
  server: {
    androidScheme: "https",
    iosScheme: "https",
  },
  plugins: {
    Geolocation: {
      ios: {
        plist: {
          NSLocationWhenInUseUsageDescription:
            "We need your location to show nearby dining locations and collect busyness data.",
          NSLocationAlwaysUsageDescription:
            "We need your location to notify you about nearby dining locations and collect busyness data.",
        },
      },
      android: {
        manifest: {
          permissions: [
            "android.permission.ACCESS_COARSE_LOCATION",
            "android.permission.ACCESS_FINE_LOCATION",
          ],
        },
      },
    },
  },
};

export default config;

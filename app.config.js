const commonConfig = {
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon_app.png",
    splash: {
        image: "./assets/logosplash.png",
        resizeMode: "cover",
        backgroundColor: "#ffffff"
    },
    updates: {
        fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
        "**/*"
    ],
    ios: {
        buildNumber: "1",
        supportsTablet: false,
        usesIcloudStorage: false,
        usesAppleSignIn: false,
        infoPlist: {
            UIUserInterfaceStyle: "Light",
            NSMotionUsageDescription: "For special gestures",
            NSPhotoLibraryUsageDescription: "For using photos",
            UIBackgroundModes: "remote-notification"
        },
        bundleIdentifier: "com.cornerstone.cs",
        userInterfaceStyle: "light"
    },
    android: {
        versionCode: 1,
        adaptiveIcon: {
            "foregroundImage": "./assets/icon_app.png",
            "backgroundColor": "#FFFFFF"
        },
        package: "com.cornerstone.cs",
        useNextNotificationsApi: true,
        userInterfaceStyle: "light",
        permissions: [
            "CAMERA"
        ]
    },
    web: {
        favicon: "./assets/favicon.png"
    },
    "notification": {
        "icon": "./assets/notification-icon.png",
        "color": "#CA2C92",
        "androidMode": "default",
        "androidCollapsedTitle": "Notification cs",
        "iosDisplayInForeground": true
    },
    "plugins": [
        [
            "expo-notifications",
            {
                "icon": "./assets/notification-icon.png",
                "color": "#CA2C92",
                "androidCollapsedTitle": "Notification cs",
                "androidMode": "default",
                "sounds": [],
                "iosDisplayInForeground": true
            }
        ]
    ],
    description: ""
};

module.exports = () => {
    if (process.env.APP_ENV === "production") {
        return {
            ...commonConfig,
            name: "cs-app-frontend",
            slug: "cs-app-frontend",
            extra: {
                NAME_APP: "cs-app-frontend",
                BASE_URL: "BASE_URL"
            }

        };
    } else if (process.env.APP_ENV === "development") {
        return {
            ...commonConfig,
            name: "cs-app-frontend (Development)",
            slug: "cs-app-frontend-dev",
            extra: {
                NAME_APP: "cs-app-frontend",
                BASE_URL: "BASE_URL"
            }
        };
    }
};

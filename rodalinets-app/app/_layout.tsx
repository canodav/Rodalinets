import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { View, Text } from "@/components/Themed";
import { Header } from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Poppins_Regular: require("../assets/fonts/Poppins-Regular.ttf"),
        Poppins_Bold: require("../assets/fonts/Poppins-Bold.ttf"),
        Poppins_Black: require("../assets/fonts/Poppins-Black.ttf"),

        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
      <Stack>
          <Stack.Screen
              name="(tabs)"
              options={{
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: Colors.background,
                  },
                  headerShadowVisible: false,
                  headerTitleAlign: 'center',
                  headerTitle: (props) => (
                      <Text style={{ fontFamily: "Poppins_Black", fontSize: 30, lineHeight: 70 }}>
                          RODALI<Text style={{color: Colors.tint}}>NETS</Text>
                      </Text>
                  ),
              }}
          />
      </Stack>
    );
}

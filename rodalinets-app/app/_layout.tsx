import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme, PixelRatio } from 'react-native';
import { View, Text } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { EventProvider } from 'react-native-outside-press';
import { Fonts, LineHeights } from '@/constants/Fonts';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: any) => size / fontScale;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_Regular: require('../assets/fonts/Poppins-Regular.ttf'),
    Poppins_Bold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    Poppins_Black: require('../assets/fonts/Poppins-Black.ttf'),

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

const Header = () => {
  return (
    <Text style={{ fontFamily: 'Poppins_Black', fontSize: Fonts.xl4, lineHeight: LineHeights.xl4 }}>
      RODALI<Text style={{ color: Colors.tint }}>NETS</Text>
    </Text>
  );
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <EventProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: Colors.background,
            },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitle: (props) => <Header />,
          }}
        />
        <Stack.Screen
          name="travel"
          options={{
            animation: 'slide_from_bottom',
            animationDuration: 0.01,
            headerShown: true,
            headerStyle: {
              backgroundColor: Colors.background,
            },
            headerBackVisible: false,
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitle: (props) => (
              <Header />
            ),
          }}
        />
        <Stack.Screen
          name="trainarrival"
          options={{
            presentation: 'transparentModal',
            headerShown: false,

            headerStyle: {
              backgroundColor: Colors.background,
            },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitle: (props) => (
              <Header />
            ),
          }}
        />
      </Stack>
    </EventProvider>
  );
}

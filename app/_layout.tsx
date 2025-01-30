import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider , } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useNavigation } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/components/useColorScheme';
import { Platform, TouchableOpacity } from 'react-native';
import { Button, Icon, Text } from 'react-native-paper';
import Article from './[article]';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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

  const navigation = useNavigation()
  return (
      <Stack screenOptions={{title: 'Dev Community'}}>
        <Stack.Screen 
        name="[article]" 
        options={{
          title: 'Dev Community',
          headerLeft: () => (
            <TouchableOpacity hitSlop={25} onPress={()=> navigation.goBack()}><Icon source={'arrow-left'} size={25}/></TouchableOpacity>
          ),
          }}
         />
      </Stack>
  );
}

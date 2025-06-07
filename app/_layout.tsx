import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { tokenCache } from '@clerk/clerk-expo/token-cache'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set in .env'
  )
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: "Faith Feed", }} />
            <Stack.Screen name="notifications" options={{ title: "Notifications", headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkProvider>
  );
}

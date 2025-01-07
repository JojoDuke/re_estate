import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useColorScheme } from 'nativewind';
import { Stack } from 'expo-router';
import './global.css';

export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        },
        headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
      }}
    />
  );
} 
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { useGlobalContext } from '@/lib/global-provider'
import { logout } from '@/lib/appwrite'
import { useRouter } from 'expo-router'

const TabsLayout = () => {
  const { refetch } = useGlobalContext();
  const router = useRouter();

  const handleLogout = async () => {
    const response = await logout();
    if (response) {
      refetch();
      router.replace('/sign-in');
    }
  };

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity 
            onPress={handleLogout}
            className="mr-4"
          >
            <Text className="text-red-500 font-RubikMedium">Logout</Text>
          </TouchableOpacity>
        ),
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          borderTopColor: "#0061ff1a",
          position: 'absolute',
        },
      }}
    >
      <Tabs.Screen name="index" />
    </Tabs>
  )
}

export default TabsLayout;
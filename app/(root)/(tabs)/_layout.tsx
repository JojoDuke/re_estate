import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { useGlobalContext } from '@/lib/global-provider'
import { logout } from '@/lib/appwrite'
import { useRouter } from 'expo-router'
import icons from '@/constants/icons'

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => {
    return (
        <View className="flex flex-col flex-1 items-center mt-3">
            <Image 
                source={icon} 
                tintColor={focused ? '#0061ff' : '#999'}
                className="w-6 h-6"
                resizeMode="contain"
            />
            <Text className={`${focused ? 'text-blue-500 font-RubikMedium' : 'text-black-200 font-Rubik'} text-xs w-full text-center mt-1`}>{title}</Text>
        </View>
    );
}

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
          borderTopWidth: 1,
          minHeight: 70,
          borderTopColor: "#0061ff1a",
          position: 'absolute',
        },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <TabIcon 
              icon={icons.home}
              title="Home"
              focused={focused}
            />
          )
        }}
      />

<Tabs.Screen 
        name="explore" 
        options={{
          headerShown: false,
          title: 'Explore',
          tabBarIcon: ({focused}) => (
            <TabIcon 
              icon={icons.search}
              title="Explore"
              focused={focused}
            />
          )
        }}
      />

<Tabs.Screen 
        name="profile" 
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({focused}) => (
            <TabIcon 
              icon={icons.person}
              title="Profile"
              focused={focused}
            />
          )
        }}
      />

    </Tabs>
  )
}

export default TabsLayout;
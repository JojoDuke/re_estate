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
                tintColor={focused ? '#1AB02A' : '#999'}
                className="w-6 h-6"
                resizeMode="contain"
            />
            <Text 
                className={`${focused ? 'text-[#1AB02A]' : 'text-gray-500'} text-xs w-full text-center mt-1`}
                style={{fontFamily: focused ? 'PlusJakartaSans-SemiBold' : 'PlusJakartaSans-Regular'}}
            >
                {title}
            </Text>
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
                        className="mr-5 bg-red-500/10 px-4 py-2 rounded-xl"
                    >
                        <Text 
                            className="text-red-500"
                            style={{fontFamily: 'PlusJakartaSans-SemiBold'}}
                        >
                            Logout
                        </Text>
                    </TouchableOpacity>
                ),
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopWidth: 1,
                    borderTopColor: "#f1f1f1",
                    height: 80,
                    paddingBottom: 20,
                    paddingTop: 10,
                    elevation: 0,
                    shadowOpacity: 0,
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
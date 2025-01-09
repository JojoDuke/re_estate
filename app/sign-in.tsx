import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import images from '@/constants/images';
import icons from '@/constants/icons';
import { login } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { Redirect, useRouter } from 'expo-router';

const SignIn = () => {
    const router = useRouter();
    const { refetch, loading, isLoggedIn } = useGlobalContext();
    
    if(!loading && isLoggedIn) {
        return <Redirect href="/" />
    }

    const handleSignIn = async () => {
        const response = await login();

        if (response) {
            refetch();
        } else {
            console.log('Failed to login');
        }
    }

  return (
    <SafeAreaView className='bg-white h-full'>
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <Image 
                source={images.onboarding} 
                className="w-full h-4/6" 
                resizeMode="contain"
            />

            <View className="px-10 pb-10">
                <Text className="text-base text-center uppercase font-Rubik text-blue-200">Welcome to re_Estate</Text>
                <Text className="text-3xl font-RubikBold text-black-300 text-center mt-2">Let's Get You Closer to {'\n'}Your Dream Home</Text>

                <Text className="text-lg text-center font-Rubik text-black-300 mt-10">
                    Login to Re_Estate with Google
                </Text>

                <TouchableOpacity
                    className='shadow-zinc-300 text-center flex flex-row items-center justify-center rounded-full w-full py-4 mt-5 bg-white shadow-md'
                    onPress={handleSignIn}>
                    
                    <View className="flex flex-row items-center justify-center">
                        <Image 
                            source={icons.google}
                                className="w-5 h-5"
                            resizeMode="contain"
                        />

                    <Text className="text-lg font-RubikMedium text-black-300 ml-2">Continue with Google</Text>
                    </View>

                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn;
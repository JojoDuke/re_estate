import { View, Text, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

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
        <>
            <StatusBar 
                backgroundColor="transparent" 
                style="light"
                translucent={true}
            />
            <ImageBackground
                source={require('../assets/images/onboarding.png')}
                className="flex-1"
                resizeMode="cover"
            >
                <View className="absolute inset-0 bg-black/40" />
                <SafeAreaView className='flex-1'>
                    <View className="flex-1 px-8 justify-center">
                        {/* Logo and Title Section */}
                        <View className="mb-16">
                            <Text className="text-[#31DE37] text-6xl font-bold mb-3" style={{fontFamily: 'PlusJakartaSans-Bold'}}>
                                MiDa
                            </Text>
                            <Text className="text-white text-lg" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
                                Your dream home awaits.
                            </Text>
                        </View>

                        {/* Welcome Text Section */}
                        <View className="mb-12">
                            <Text className="text-white text-3xl mb-3" style={{fontFamily: 'PlusJakartaSans-Bold'}}>
                                Welcome back
                            </Text>
                            <Text className="text-gray-200" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
                                Sign in to continue your home search journey
                            </Text>
                        </View>

                        {/* Sign In Button */}
                        <TouchableOpacity
                            className='shadow-lg shadow-black/10 flex flex-row items-center justify-center rounded-2xl w-full py-4 bg-white'
                            onPress={handleSignIn}>
                            <View className="flex flex-row items-center justify-center space-x-3">
                                <Image 
                                    source={icons.google}
                                    className="w-5 h-5"
                                    resizeMode="contain"
                                />
                                <Text className="text-black text-base" style={{fontFamily: 'PlusJakartaSans-SemiBold'}}>
                                    Continue with Google
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Terms Text */}
                        <Text className="text-center mt-8 text-gray-300 px-6" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </Text>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </>
    )
}

export default SignIn;
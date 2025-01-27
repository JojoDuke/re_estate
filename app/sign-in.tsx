import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import icons from '@/constants/icons';
import { login } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { Redirect } from 'expo-router';

const SignIn = () => {
    const { refetch, loading, isLoggedIn } = useGlobalContext();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    
    const isFormValid = email.trim() !== '' && password.trim() !== '';

    if(!loading && isLoggedIn) {
        return <Redirect href="/" />
    }

    const handleEmailSignIn = () => {
        setError('Username or password is incorrect');
        // Clear error after 5 seconds
        setTimeout(() => {
            setError('');
        }, 5000);
    };

    const handleSignIn = () => {
        // Navigate directly to home
        router.replace("/");
    }

    return (
        <>
            <StatusBar 
                backgroundColor="#ffffff" 
                style="dark"
                translucent={false}
            />
            <SafeAreaView className='bg-white h-full'>
                <View className="flex-1 px-8 pt-12">
                    {/* Logo Section */}
                    <Image 
                        source={require('../assets/images/iconGreen.png')}
                        className="w-16 h-16"
                        resizeMode="contain"
                    />
                    
                    {/* Welcome Text */}
                    <Text className="text-black text-2xl mt-6" style={{fontFamily: 'PlusJakartaSans-SemiBold'}}>
                        Sign in to MiDa
                    </Text>
                    
                    <Text className="text-gray-600 text-base mt-2" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
                        Enter your details below
                    </Text>

                    {/* Sign In Form */}
                    <View className="mt-8">
                        {error ? (
                            <Text className="text-red-500 mb-4 text-center" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
                                {error}
                            </Text>
                        ) : null}

                        <View className="mb-4">
                            <Text className="text-gray-700 mb-2" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
                                Email
                            </Text>
                            <TextInput 
                                placeholder="Enter your email"
                                className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3`}
                                placeholderTextColor="#9CA3AF"
                                style={{fontFamily: 'PlusJakartaSans-Regular'}}
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setError('');
                                }}
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="text-gray-700 mb-2" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
                                Password
                            </Text>
                            <TextInput 
                                placeholder="Enter your password"
                                secureTextEntry
                                className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3`}
                                placeholderTextColor="#9CA3AF"
                                style={{fontFamily: 'PlusJakartaSans-Regular'}}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setError('');
                                }}
                            />
                        </View>

                        {/* Email/Password Sign In Button */}
                        <TouchableOpacity
                            className={`shadow-lg shadow-black/10 flex flex-row items-center justify-center rounded-2xl w-full py-4 mb-8 ${isFormValid ? 'bg-[#1AB02A]' : 'bg-gray-300'}`}
                            onPress={handleEmailSignIn}
                            disabled={!isFormValid}>
                            <Text className="text-white text-base" style={{fontFamily: 'PlusJakartaSans-SemiBold'}}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text className="text-center text-gray-600 mb-4" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
                        Or continue with
                    </Text>

                    {/* Google Sign In Button */}
                    <TouchableOpacity
                        className='shadow-lg shadow-black/10 flex flex-row items-center justify-center rounded-2xl w-full py-4 bg-black'
                        onPress={handleSignIn}>
                        <View className="flex flex-row items-center justify-center">
                            <Image 
                                source={icons.google}
                                className="w-5 h-5"
                                resizeMode="contain"
                            />
                            <Text className="text-white text-base ml-3" style={{fontFamily: 'PlusJakartaSans-SemiBold'}}>
                                Continue with Google
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* Terms Text */}
                    <Text className="text-gray-500 text-sm text-center mt-6 px-4" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
                        By continuing, you agree to our Terms and Privacy Policy
                    </Text>
                </View>
            </SafeAreaView>
        </>
    )
}

export default SignIn;
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from "expo-image";
import icons from '@/constants/icons';
import { settings } from '@/constants/data';
import { router } from 'expo-router';

interface SettingsItemsProps {
  icon: any;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const Profile = () => {
  const SettingsItems = ({ icon, title, onPress, textStyle, showArrow = true }:  SettingsItemsProps ) => {
    return (
      <TouchableOpacity onPress={onPress} className="flex flex-row justify-between items-center mt-5 py-3">
        <View className="flex flex-row items-center gap-3">
          <Image source={icon} className="w-6 h-6" contentFit="contain"/>
          <Text className={`text-lg ${textStyle}`} style={{fontFamily: 'PlusJakartaSans-Medium'}}>{title}</Text>
        </View>
        {showArrow && <Image source={icons.rightArrow} className="w-5 h-5" contentFit="contain"/>}
      </TouchableOpacity>
    );
  }
  
  const handleLogout = () => {
    router.replace('/sign-in');
  };
  
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7">

        <View className="flex flex-row mt-5 justify-between items-center">
          <Text className="text-xl" style={{fontFamily: 'PlusJakartaSans-Bold'}}>Profile</Text>
          <Image source={icons.bell} className="w-6 h-6" contentFit="contain"/>
        </View>

        <View className="flex-row mt-5 justify-center">
          <View className="flex flex-col items-center relative mt-5">
            <View className="w-44 h-44 rounded-full bg-purple-500 items-center justify-center">
              <Text className="text-white text-4xl" style={{fontFamily: 'PlusJakartaSans-Bold'}}>JD</Text>
            </View>

            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="w-9 h-9" contentFit="contain"/>
            </TouchableOpacity>

            <Text className="text-2xl mt-2" style={{fontFamily: 'PlusJakartaSans-Bold'}}>John Doe</Text>
          </View>
        </View>

        <View className="flex flex-col mt-10">
          <SettingsItems 
            icon={icons.calendar}
            title="My Bookings"
          />
          <SettingsItems 
            icon={icons.wallet}
            title="Payments"
          />
        </View>

        <View className="flex flex-col mt-10 border-t border-gray-300 pt-5">
          {settings.slice(2).map((item, index) => (
            <SettingsItems key={index} {...item}/>
          ))}
        </View>

        <View className="flex flex-col mt-10 border-t border-gray-300 pt-5">
          <View className="relative">
            <SettingsItems 
              icon={icons.logout}
              title="Logout"
              onPress={handleLogout}
              textStyle="text-red-500"
              showArrow={false}
            />
            <Image 
              source={icons.logout} 
              className="w-5 h-5 absolute right-0 top-1/2 -translate-y-1/2" 
              tintColor="#EF4444"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile;
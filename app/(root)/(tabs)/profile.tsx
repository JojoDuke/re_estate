import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { settings } from '@/constants/data';
import { useGlobalContext } from '@/lib/global-provider';
import { logout } from '@/lib/appwrite';

interface SettingsItemsProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const SettingsItems = ({ icon, title, onPress, textStyle, showArrow = true }:  SettingsItemsProps ) => {
    return (
      <TouchableOpacity onPress={onPress} className="flex flex-row justify-between items-center mt-5 py-3">
        <View className="flex flex-row items center gap-3">
          <Image source={icon} className="size-6"/>
          <Text className={`text-lg font-RubikMedium text-black-300 ${textStyle}`}>{title}</Text>
        </View>
        {showArrow && <Image source={icons.rightArrow} className="size-5"/>}
      </TouchableOpacity>
    );
  }
  
  const handleLogout = async () => {
    const result = await logout();

    if(result) {
      refetch();
    }
  };
  
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7">

        <View className="flex flex-row mt-5 justify-between items-center">
          <Text className="text-xl font-RubikBold">Profile</Text>
          <Image source={icons.bell}/>
        </View>

        <View className="flex-row mt-5 justify-center">
          <View className="flex flex-col items-center relative mt-5">
            <Image 
              source={{ uri: user?.avatar }}
              className="size-44 rounded-full relative"/>

            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9"/>
            </TouchableOpacity>

            <Text className="text-2xl font-RubikBold mt-2">{user?.name}</Text>
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
          <SettingsItems 
            icon={icons.logout}
            title="Logout"
            onPress={handleLogout}
            textStyle="text-red-500"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile;
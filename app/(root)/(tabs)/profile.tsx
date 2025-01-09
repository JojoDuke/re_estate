import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import images from '@/constants/images';

const Profile = () => {
  const handleLogout = () => {};
  
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
              source={images.avatar}
              className="size-44 rounded-full relative"/>
            <TouchableOpacity></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile;
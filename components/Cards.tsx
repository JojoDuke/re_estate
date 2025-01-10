import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images';
import icons from '@/constants/icons';

interface Props {
    onPress?: () => void;
}

export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity 
        className="flex flex-col items-start w-60 h-80 relative"
        onPress={onPress}>
        <Image source={images.japan} className="size-full rounded-2xl"/>
        <Image source={images.cardGradient} className=" size-full rounded-2xl absolute bottom-0"/>

    <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-RubikBold text-blue-500 ml-1">
          4.4
        </Text>
    </View>

      <View className="flex flex-col items-center absolute bottom-5 inset-x-5">
        <Text
          className="text-xl font-RubikExtraBold text-white text-center"
          numberOfLines={1}
        >
          Japan
        </Text>
        <Text className="text-base font-Rubik text-white">Address</Text>
        <View className="flex flex-row items-center justify-between w-full">
            <Text className="text-base font-Rubik text-white">Starts from</Text>
            <Text className="text-base font-RubikBold text-white">$1000</Text>
            <Image source={icons.heart} className="size-5"/>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const Card = ({ onPress }: Props) => {
    return (
        <TouchableOpacity 
            className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
            onPress={onPress}>

                <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-RubikBold text-blue-500 ml-0.5">
          3.1
        </Text>
    </View>

    <Image source={images.newYork} className="rounded-lg w-full h-40"/>

      <View className="flex flex-col mt-2">
        <Text
          className="text-base font-RubikBold text-black-300 text-center"
          numberOfLines={1}
        >
          New York Studio
        </Text>
        <Text className="text-xs font-Rubik text-black-300">Address</Text>
        <View className="flex flex-row items-center justify-between mt-2">
            <Text className="text-base font-Rubik text-black-300">Starts from</Text>
            <Text className="text-base font-RubikBold text-blue-500">$1000</Text>
            <Image source={icons.heart} className="h-5 w-5 mr-2" tintColor="#191d31"/>
        </View>
      </View>
        </TouchableOpacity>
    )
}
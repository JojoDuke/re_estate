import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images';
import icons from '@/constants/icons';
import { Models } from 'react-native-appwrite';

interface Props {
    item: Models.Document;
    onPress?: () => void;
}

export const FeaturedCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity 
        className="flex flex-col items-start w-72 h-80 relative"
        onPress={onPress}>
        <Image source={{uri: item.image}} className="size-full rounded-3xl"/>
        <View 
            key="overlay"
            className="absolute inset-0 bg-black/20 rounded-3xl"
        />

        <View className="flex flex-row items-center bg-white/95 px-3 py-1.5 rounded-full absolute top-4 right-4">
            <Image source={icons.star} className="w-3.5 h-3.5" tintColor="#1AB02A"/>
            <Text className="text-xs ml-1" style={{fontFamily: 'PlusJakartaSans-Bold', color: '#1AB02A'}}>
                {item.rating}
            </Text>
        </View>

        <View className="absolute bottom-4 inset-x-4">
            <Text
                className="text-xl text-white mb-1"
                style={{fontFamily: 'PlusJakartaSans-Bold'}}
                numberOfLines={1}
            >
                {item.name}
            </Text>
            <Text className="text-white/90 mb-3" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
                {item.address}
            </Text>
            <View className="flex flex-row items-center justify-between">
                <View>
                    <Text className="text-white/80" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
                        Starts from
                    </Text>
                    <Text className="text-white text-lg" style={{fontFamily: 'PlusJakartaSans-Bold'}}>
                        ${item.price.toLocaleString()}
                    </Text>
                </View>
                <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                    <Image source={icons.heart} className="w-5 h-5" tintColor="#fff"/>
                </TouchableOpacity>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export const Card = ({ item, onPress }: Props) => {
    return (
        <TouchableOpacity 
            className="flex-1 mt-4 rounded-2xl bg-white shadow-lg shadow-black/5 overflow-hidden"
            style={{elevation: 3}}
            onPress={onPress}>
            <View className="relative">
                <Image source={{uri: item.image}} className="w-full h-40 rounded-t-2xl"/>
                <View 
                    key="overlay"
                    className="absolute inset-0 bg-black/40 rounded-t-2xl"
                />
                
                <View className="absolute top-3 right-3 flex flex-row items-center bg-white/95 px-2.5 py-1 rounded-full">
                    <Image source={icons.star} className="w-3.5 h-3.5" tintColor="#1AB02A"/>
                    <Text className="text-xs ml-1" style={{fontFamily: 'PlusJakartaSans-Bold', color: '#1AB02A'}}>
                        {item.rating}
                    </Text>
                </View>
            </View>

            <View className="p-3">
                <Text
                    className="text-base text-black mb-1"
                    style={{fontFamily: 'PlusJakartaSans-Bold'}}
                    numberOfLines={1}
                >
                    {item.name}
                </Text>
                <Text 
                    className="text-gray-500 text-sm mb-2" 
                    style={{fontFamily: 'PlusJakartaSans-Regular'}}
                    numberOfLines={1}
                >
                    {item.address}
                </Text>
                <View className="flex flex-row items-center justify-between">
                    <View>
                        <Text className="text-gray-500 text-xs" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
                            Starts from
                        </Text>
                        <Text className="text-[#1AB02A]" style={{fontFamily: 'PlusJakartaSans-Bold'}}>
                            ${item.price.toLocaleString()}
                        </Text>
                    </View>
                    <TouchableOpacity className="w-8 h-8 bg-[#1AB02A]/10 rounded-full items-center justify-center">
                        <Image source={icons.heart} className="w-4 h-4" tintColor="#1AB02A"/>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}
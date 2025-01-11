import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'

const NoResults = () => {
  return (
    <View className="flex items-center my-5">
      <Image 
        source={images.noResult} 
        resizeMode="contain"
        className="h-80 w-11/12"/>
        <Text className="text-2xl font-RubikBold text-black-300 mt-5">No Results</Text>
        <Text className="text-base font-Rubik text-black-100 mt-2">We could not find any results</Text>
    </View>
  )
}

export default NoResults
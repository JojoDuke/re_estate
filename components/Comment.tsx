import { View, Text, Image, TouchableOpacity } from "react-native";

import images from "@/constants/images";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
}

const Comment = ({ item }: Props) => {
  return (
    <View className="bg-gray-50 p-4 rounded-2xl">
      {/* User Info */}
      <View className="flex flex-row items-center mb-3">
        <Image 
          source={{ uri: item.avatar }} 
          className="w-12 h-12 rounded-full"
        />
        <View className="ml-3">
          <Text className="text-black" style={{fontFamily: 'PlusJakartaSans-SemiBold'}}>
            {item.name}
          </Text>
          <Text className="text-gray-500 text-sm" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
            {new Date(item.$createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </Text>
        </View>
      </View>

      {/* Review Text */}
      <Text 
        className="text-gray-600 leading-6 mb-4" 
        style={{fontFamily: 'PlusJakartaSans-Regular'}}
      >
        {item.review}
      </Text>

      {/* Interaction Section */}
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity 
          className="flex flex-row items-center bg-[#1AB02A]/10 px-4 py-2 rounded-full"
        >
          <Image 
            source={icons.heart} 
            className="w-4 h-4" 
            tintColor="#1AB02A"
          />
          <Text 
            className="text-[#1AB02A] ml-2" 
            style={{fontFamily: 'PlusJakartaSans-Medium'}}
          >
            Helpful
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text 
            className="text-gray-500" 
            style={{fontFamily: 'PlusJakartaSans-Regular'}}
          >
            Report
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comment;
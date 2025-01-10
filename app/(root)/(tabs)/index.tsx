import { Text, View, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useGlobalContext } from "@/lib/global-provider";
import Search from "@/components/Search";
import { Card } from "@/components/Cards";
import { FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";

export default function Index() {
  const { user, refetch } = useGlobalContext();

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        <View className="flex flex-row justify-between mt-5 items-center">
          <View className="flex flex-row items-center gap-2">
            <Image source={{ uri: user?.avatar }} className="size-12 rounded-full"/>
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-xs font-Rubik text-black-100">Good Morning</Text>
              <Text className="text-base font-RubikMedium text-black-300">{user?.name}</Text>
            </View>
          </View>
          <Image source={icons.bell} className="size-6"/>
        </View>

        <Search />
      <View className="my-5">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xl font-RubikBold text-black-300">Featured</Text>
          <TouchableOpacity>
            <Text className="text-base font-RubikBold text-blue-500">View All</Text>
            </TouchableOpacity>
          </View>
          
          <View className="flex flex-row gap-5 mt-5">
            <FeaturedCard />
            <FeaturedCard />
            <FeaturedCard />
            <FeaturedCard />
          </View>
      </View>
      {/* our recommendations */}
      <View className="my-5">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xl font-RubikBold text-black-300">Our Recommendations</Text>
          <TouchableOpacity>
            <Text className="text-base font-RubikBold text-blue-500">View All</Text>
            </TouchableOpacity>
          </View>

          <Filters />

          <View className="flex flex-row gap-5 mt-5">
            <Card />
            <Card />
          </View>
      </View>
      </View>
      
    </SafeAreaView>
  );
}

import { Text, View, Image } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useGlobalContext } from "@/lib/global-provider";

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
      </View>
    </SafeAreaView>
  );
}

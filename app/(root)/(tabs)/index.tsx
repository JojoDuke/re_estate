import { Text, View, Image, TouchableOpacity, FlatList, Button, ActivityIndicator } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useGlobalContext } from "@/lib/global-provider";
import Search from "@/components/Search";
import { Card } from "@/components/Cards";
import { FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import { useAppwrite } from "@/lib/useAppwrite";
import { getProperties } from "@/lib/appwrite";
import { getLatestProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";
//import seed from "@/lib/seed";

export default function Index() {
  const { user, refetch } = useGlobalContext();
  const params = useLocalSearchParams<{
    filter?: string,
    query: string,
  }>();

  const { data: latestProperties, loading: latestPropertiesLoading } = useAppwrite({
    fn: getLatestProperties,
  });

  const { data: properties, loading: propertiesLoading, refetch: propertiesRefetch } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
  });

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  }

  useEffect(() => {
    if (params.filter || params.query) {
      propertiesRefetch({
        filter: params.filter!,
        query: params.query!,
        limit: 6,
      });
    }
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      
      <FlatList 
        data={properties}
        renderItem={({item}) => <Card item={item} onPress={() => handleCardPress(item.$id)}/>}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperClassName="flex gap-5 px-5"
        contentContainerClassName="pb-32"
        ListEmptyComponent={
          propertiesLoading ? (
            <ActivityIndicator size="large" className="mt-5 text-blue-500"/>
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={() => {
          return (
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

          {latestPropertiesLoading ? (
            <ActivityIndicator size="large" className="text-blue-500" />
          ) : !latestProperties || latestProperties.length === 0 ? (
            <NoResults />
          ) : (
          <FlatList 
            data={latestProperties}
            renderItem={({item}) => <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)}/>}
            keyExtractor={(item) => item.$id}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            contentContainerClassName="flex flex-row gap-5 mt-5"
          />
          )}
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

      </View>
      </View>
          )
        }}
        />
      
      
      
    </SafeAreaView>
  );
}

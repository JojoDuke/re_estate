import { Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import Search from "@/components/Search";
import { Card } from "@/components/Cards";
import { FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import { useAppwrite } from "@/lib/useAppwrite";
import { getProperties, getLatestProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";

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
        columnWrapperClassName="flex gap-4 px-5"
        contentContainerClassName="pb-32"
        ListEmptyComponent={
          propertiesLoading ? (
            <ActivityIndicator size="large" className="mt-5" color="#1AB02A"/>
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            {/* Header Section */}
            <View className="flex flex-row justify-between mt-5 items-center">
              <View className="flex flex-row items-center">
                <View className="w-12 h-12 rounded-full bg-purple-500 items-center justify-center">
                  <Text className="text-white text-lg" style={{fontFamily: 'PlusJakartaSans-Bold'}}>JD</Text>
                </View>
                <View className="ml-3">
                  <Text className="text-gray-500" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
                    Welcome back
                  </Text>
                  <Text className="text-lg text-black" style={{fontFamily: 'PlusJakartaSans-SemiBold'}}>
                    John Doe
                  </Text>
                </View>
              </View>
              <TouchableOpacity className="w-10 h-10 bg-[#1AB02A]/10 rounded-full items-center justify-center">
                <Image source={icons.bell} className="w-5 h-5" tintColor="#1AB02A"/>
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View className="mt-8">
              <Search />
            </View>

            {/* Featured Section */}
            <View className="mt-8">
              <View className="flex flex-row items-center justify-between mb-4">
                <Text className="text-xl text-black" style={{fontFamily: 'PlusJakartaSans-Bold'}}>
                  Featured Properties
                </Text>
                <TouchableOpacity onPress={() => router.push('/explore')}>
                  <Text className="text-[#1AB02A]" style={{fontFamily: 'PlusJakartaSans-SemiBold'}}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              {latestPropertiesLoading ? (
                <ActivityIndicator size="large" color="#1AB02A" />
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
                  contentContainerClassName="flex flex-row gap-4 mt-2"
                />
              )}
            </View>

            {/* Recommendations Section */}
            <View className="mt-8">
              <View className="flex flex-row items-center justify-between mb-4">
                <Text className="text-xl text-black" style={{fontFamily: 'PlusJakartaSans-Bold'}}>
                  Recommended for You
                </Text>
                <TouchableOpacity onPress={() => router.push('/explore')}>
                  <Text className="text-[#1AB02A]" style={{fontFamily: 'PlusJakartaSans-SemiBold'}}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              <Filters />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

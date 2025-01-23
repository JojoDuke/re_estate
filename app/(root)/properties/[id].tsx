import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { facilities } from "@/constants/data";
import Comment from "@/components/Comment";
import { useAppwrite } from "@/lib/useAppwrite";
import { getPropertyById } from "@/lib/appwrite";

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const windowHeight = Dimensions.get("window").height;
  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: { id: id! },
  });

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light"/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32">
        {/* Hero Image Section */}
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          <Image
            source={{ uri: property?.image }}
            className="size-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"/>

          {/* Header Buttons */}
          <View
            className="z-50 absolute inset-x-5"
            style={{ top: Platform.OS === "ios" ? 60 : 20 }}
          >
            <View className="flex flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full items-center justify-center"
              >
                <Image source={icons.backArrow} className="w-5 h-5" tintColor="#fff"/>
              </TouchableOpacity>

              <View className="flex flex-row items-center gap-3">
                <TouchableOpacity className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full items-center justify-center">
                  <Image source={icons.heart} className="w-5 h-5" tintColor="#fff"/>
                </TouchableOpacity>
                <TouchableOpacity className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full items-center justify-center">
                  <Image source={icons.send} className="w-5 h-5" tintColor="#fff"/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View className="px-5 -mt-10 relative z-10">
          {/* Property Type Badge */}
          <View className="flex flex-row items-center gap-3 mb-3">
            <View className="bg-[#1AB02A]/10 px-4 py-1.5 rounded-full">
              <Text className="text-[#1AB02A]" style={{fontFamily: 'PlusJakartaSans-SemiBold'}}>
                {property?.type}
              </Text>
            </View>
            <View className="flex flex-row items-center">
              <Image source={icons.star} className="w-4 h-4" tintColor="#1AB02A"/>
              <Text className="text-gray-600 ml-1" style={{fontFamily: 'PlusJakartaSans-Medium'}}>
                {property?.rating} ({property?.reviews.length} reviews)
              </Text>
            </View>
          </View>

          {/* Property Title */}
          <Text className="text-2xl text-black mb-4" style={{fontFamily: 'PlusJakartaSans-Bold'}}>
            {property?.name}
          </Text>

          {/* Property Stats */}
          <View className="flex flex-row items-center justify-between bg-gray-50 p-4 rounded-2xl mb-6">
            <View className="items-center">
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center mb-1">
                <Image source={icons.bed} className="w-5 h-5" tintColor="#1AB02A"/>
              </View>
              <Text className="text-gray-600" style={{fontFamily: 'PlusJakartaSans-Medium'}}>
                {property?.bedrooms} Beds
              </Text>
            </View>
            <View className="items-center">
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center mb-1">
                <Image source={icons.bath} className="w-5 h-5" tintColor="#1AB02A"/>
              </View>
              <Text className="text-gray-600" style={{fontFamily: 'PlusJakartaSans-Medium'}}>
                {property?.bathrooms} Baths
              </Text>
            </View>
            <View className="items-center">
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center mb-1">
                <Image source={icons.area} className="w-5 h-5" tintColor="#1AB02A"/>
              </View>
              <Text className="text-gray-600" style={{fontFamily: 'PlusJakartaSans-Medium'}}>
                {property?.area} sqft
              </Text>
            </View>
          </View>

          {/* Agent Section */}
          <View className="bg-gray-50 p-4 rounded-2xl mb-6">
            <Text className="text-black mb-4" style={{fontFamily: 'PlusJakartaSans-Bold'}}>
              Agent
            </Text>
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: property?.agent.avatar }}
                  className="w-12 h-12 rounded-full"
                />
                <View className="ml-3">
                  <Text className="text-black" style={{fontFamily: 'PlusJakartaSans-SemiBold'}}>
                    {property?.agent.name}
                  </Text>
                  <Text className="text-gray-500 text-sm" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
                    {property?.agent.email}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row gap-2">
                <TouchableOpacity className="w-10 h-10 bg-[#1AB02A]/10 rounded-full items-center justify-center">
                  <Image source={icons.chat} className="w-5 h-5" tintColor="#1AB02A"/>
                </TouchableOpacity>
                <TouchableOpacity className="w-10 h-10 bg-[#1AB02A]/10 rounded-full items-center justify-center">
                  <Image source={icons.phone} className="w-5 h-5" tintColor="#1AB02A"/>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Overview Section */}
          <View className="mb-6">
            <Text className="text-black mb-2" style={{fontFamily: 'PlusJakartaSans-Bold'}}>
              Overview
            </Text>
            <Text className="text-gray-600 leading-6" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
              {property?.description}
            </Text>
          </View>

          {/* Facilities Section */}
          {property?.facilities.length > 0 && (
            <View className="mb-6">
              <Text className="text-black mb-4" style={{fontFamily: 'PlusJakartaSans-Bold'}}>
                Facilities
              </Text>
              <View className="flex flex-row flex-wrap gap-4">
                {property?.facilities.map((item: string, index: number) => {
                  const facility = facilities.find(f => f.title === item);
                  return (
                    <View key={index} className="items-center w-16">
                      <View className="w-12 h-12 bg-[#1AB02A]/10 rounded-full items-center justify-center mb-2">
                        <Image
                          source={facility?.icon || icons.info}
                          className="w-6 h-6"
                          tintColor="#1AB02A"
                        />
                      </View>
                      <Text 
                        numberOfLines={1}
                        className="text-gray-600 text-center text-sm"
                        style={{fontFamily: 'PlusJakartaSans-Medium'}}
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Gallery Section */}
          {property?.gallery.length > 0 && (
            <View className="mb-6">
              <Text className="text-black mb-4" style={{fontFamily: 'PlusJakartaSans-Bold'}}>
                Gallery
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={property?.gallery}
                keyExtractor={item => item.$id}
                renderItem={({item}) => (
                  <Image
                    source={{ uri: item.image }}
                    className="w-40 h-40 rounded-2xl mr-4"
                  />
                )}
              />
            </View>
          )}

          {/* Location Section */}
          <View className="mb-6">
            <Text className="text-black mb-4" style={{fontFamily: 'PlusJakartaSans-Bold'}}>
              Location
            </Text>
            <View className="flex flex-row items-center mb-3">
              <Image source={icons.location} className="w-5 h-5" tintColor="#1AB02A"/>
              <Text className="text-gray-600 ml-2" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
                {property?.address}
              </Text>
            </View>
            <Image
              source={images.map}
              className="w-full h-48 rounded-2xl"
            />
          </View>

          {/* Reviews Section */}
          {property?.reviews.length > 0 && (
            <View>
              <View className="flex flex-row items-center justify-between mb-4">
                <View className="flex flex-row items-center">
                  <Image source={icons.star} className="w-5 h-5" tintColor="#1AB02A"/>
                  <Text className="text-black ml-2" style={{fontFamily: 'PlusJakartaSans-Bold'}}>
                    {property?.rating} ({property?.reviews.length} reviews)
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text className="text-[#1AB02A]" style={{fontFamily: 'PlusJakartaSans-SemiBold'}}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>
              <Comment item={property?.reviews[0]} />
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-5">
        <View className="flex flex-row items-center justify-between">
          <View>
            <Text className="text-gray-500 text-sm" style={{fontFamily: 'PlusJakartaSans-Regular'}}>
              Price
            </Text>
            <Text className="text-[#1AB02A] text-2xl" style={{fontFamily: 'PlusJakartaSans-Bold'}}>
              ${property?.price}
            </Text>
          </View>
          <TouchableOpacity className="flex-1 ml-6 bg-[#1AB02A] py-4 rounded-2xl">
            <Text className="text-white text-center" style={{fontFamily: 'PlusJakartaSans-SemiBold'}}>
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Property;
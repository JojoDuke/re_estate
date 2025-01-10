import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { usePathname, useLocalSearchParams, router } from 'expo-router';
import icons from '@/constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {
    const path = usePathname();
    const params = useLocalSearchParams<{ query: string }>();
    const [search, setSearch] = useState(params.query || "");

    const debouncedSearch = useDebouncedCallback((text: string) => router.setParams({ query: text }), 500);

    const handleSearch = (text: string) => {
        //router.push(`/search?query=${search}`);
        setSearch(text);
        debouncedSearch(text);
    }

  return (
    <View className="flex flex-row items-center justify-between bg-white px-7 py-3 mt-5 border border-black-100 w-full rounded-full">
      <View className=" flex-1 flex flex-row items-center justify-start z-50 gap-2">
        <Image source={icons.search} className="size-5"/>
        <TextInput
            value={search}
            onChangeText={handleSearch}
            placeholder="Search"
            className="text-sm font-Rubik text-black-300 ml-2 flex-1"
        />
      </View>

      <TouchableOpacity>
        <Image source={icons.filter} className="size-5"/>
      </TouchableOpacity>
    </View>
  )
}

export default Search
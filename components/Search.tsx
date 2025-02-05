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

    //
    const debouncedSearch = useDebouncedCallback((text: string) => router.setParams({ query: text }), 500);

    const handleSearch = (text: string) => {
        //router.push(`/search?query=${search}`);
        setSearch(text);
        debouncedSearch(text);
    }

    return (
        <View className="flex flex-row items-center justify-between bg-gray-50 px-5 py-3.5 rounded-2xl">
            <View className="flex-1 flex flex-row items-center gap-3">
                <Image source={icons.search} className="w-5 h-5" tintColor="#666"/>
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder="Search properties..."
                    placeholderTextColor="#999"
                    className="flex-1 text-base text-gray-900"
                    style={{fontFamily: 'PlusJakartaSans-Regular'}}
                />
            </View>

            <TouchableOpacity className="w-9 h-9 bg-[#1AB02A]/10 rounded-xl items-center justify-center ml-3">
                <Image source={icons.filter} className="w-5 h-5" tintColor="#1AB02A"/>
            </TouchableOpacity>
        </View>
    )
}

export default Search
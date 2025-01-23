import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { categories } from '@/constants/data';

const Filters = () => {
    const params = useLocalSearchParams<{filter?: string}>();
    const [selectedCategory, setSelectedCategory] = useState<string>(params.filter || 'All');

    const handleCategoryPress = (category: string) => {
        if (selectedCategory === category) {
            setSelectedCategory('All');
            router.setParams({filter: 'All'});
            return
        } 

        setSelectedCategory(category);
        router.setParams({filter: category});
    }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-5 mb-5">
    {categories.map((item, index) => (
        <TouchableOpacity 
        className={`${
            selectedCategory === item.category 
                ? 'bg-[#1AB02A]' 
                : 'bg-[#1AB02A]/10'
        } flex flex-row items-center mr-3 px-5 py-2.5 rounded-xl`} 
        key={index}
        onPress={() => handleCategoryPress(item.category)}>
            <Text 
                className={selectedCategory === item.category ? 'text-white' : 'text-[#1AB02A]'}
                style={{fontFamily: 'PlusJakartaSans-SemiBold'}}
            > 
                {item.title}
            </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default Filters
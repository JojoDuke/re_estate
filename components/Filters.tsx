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
        className={`${selectedCategory === item.category ? 'bg-blue-500 text-white' : 'bg-blue-100'} flex flex-col items-start mr-4 px-4 py-2 rounded-full`} 
        key={index}
        onPress={() => handleCategoryPress(item.category)}>
            <Text className='text-base font-RubikBold' style={{color: selectedCategory === item.category ? 'white' : 'black'}}> 
                {item.title}
            </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default Filters
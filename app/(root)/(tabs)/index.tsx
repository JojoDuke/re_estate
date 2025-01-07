import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Link href="/properties/1" className="mb-4 text-blue-500">Property 1</Link>
      <Link href="/sign-in" className="mb-4 text-blue-500">Sign In</Link>
      <Link href="/profile" className="mb-4 text-blue-500">Profile</Link>
      <Link href="/explore" className="text-blue-500">Explore</Link>
    </View>
  );
}

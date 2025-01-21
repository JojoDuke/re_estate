import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaFrameContext, SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {
    const { loading, isLoggedIn } = useGlobalContext();

    if(loading) {
        return (
            <SafeAreaView className="h-full flex justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        )
    }

    if(!isLoggedIn) {
        return <Redirect href="/sign-in"/>
    }
    return <Slot />
}



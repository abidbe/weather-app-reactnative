import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "../themes";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

export default function HomeScreen() {
    const [showSearch, toggleSearch] = useState(false);
    const [locations, setLocations] = useState([1,2,3])
  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        source={require("../assets/city.png")}
        className="absolute h-full w-full"
        blurRadius={5}
      />
      <SafeAreaView className="flex flex-1 ">
        {/* search section */}
        <View className="mx-4 relative z-50" style={{ height: "7%" }}>
          <View
            className="flex-row justify-end items-center rounded-full mt-3"
            style={{ backgroundColor: showSearch?theme.bgWhite(0.2) :'transparent' }}
          >
            {
                showSearch ? (
                    <TextInput
              placeholder="Search City"
              placeholderTextColor={"lightgray"}
              className="flex-1 px-5 py-4  rounded-full text-white"
            />
                ):null
            }
            
            <TouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="rounded-full p-2 m-1"
            >
              <MagnifyingGlassIcon color="white"  />
            </TouchableOpacity>
          </View>
          {
            locations.length > 0 && showSearch ? (
                <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                    {
                        locations.map((location,index) => (
                            <TouchableOpacity key={index} className="p-3 border-b border-gray-400">
                                <Text className="text-gray-700">{location}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            ):null
            
            
            
          }
        </View>
      </SafeAreaView>
    </View>
  );
}

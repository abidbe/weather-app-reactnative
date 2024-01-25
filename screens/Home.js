import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "../themes";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);
  const handleLocation = (location) => {
    console.log("location :", location);
  };
  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image source={require("../assets/city.png")} className="absolute h-full w-full" blurRadius={30} />
      <SafeAreaView className="flex flex-1 ">
        {/* search section */}
        <View className="mx-4 relative z-50" style={{ height: "7%" }}>
          <View className="flex-row justify-end items-center rounded-full mt-3" style={{ backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent" }}>
            {showSearch ? <TextInput placeholder="Search City" placeholderTextColor={"lightgray"} className="flex-1 px-5 py-4  rounded-full text-white" /> : null}

            <TouchableOpacity onPress={() => toggleSearch(!showSearch)} style={{ backgroundColor: theme.bgWhite(0.3) }} className="rounded-full p-2 m-1">
              <MagnifyingGlassIcon color="white" />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearch ? (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {locations.map((location, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => handleLocation(location)} className="flex-row items-center px-5 py-3">
                    <MapPinIcon color="gray" />
                    <Text className="ml-2 text-gray-600">Location {index + 1}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        {/* forecast section */}
        <View className="flex-1 justify-around items-center mx-4 mb-2">
          {/* <Text className="text-4xl text-white font-bold">25°</Text>
          <Text className="text-white text-lg">Sunny</Text> */}
          {/* location */}
          <View className="flex-row items-center">
            <Text className="text-white text-2xl font-bold">
              Sleman<Text className="text-slate-300 text-xl font-normal">, DI Yogyakarta</Text>
            </Text>
          </View>
          {/* weather image */}
          <View className="flex-row items-center">
            <Image source={require("../assets/images/partlycloudy.png")} className="h-52 w-52" />
          </View>
          {/* celcius */}
          <View className="flex-col justify-center items-center">
            <Text className="text-white text-4xl font-bold justify-center">
              25°<Text className="text-white text-3xl font-normal">C</Text>
            </Text>
            <Text className="text-white text-2xl font-normal">Partly cloudy</Text>
          </View>
          {/* weather info */}
          <View className="flex-row justify-around items-center w-full">
            <View className="flex-col justify-center items-center">
              <Text className="text-white text-2xl font-bold">20%</Text>
              <Text className="text-white text-lg">Rain</Text>
            </View>
            <View className="flex-col justify-center items-center">
              <Text className="text-white text-2xl font-bold">20%</Text>
              <Text className="text-white text-lg">Humidity</Text>
            </View>
            <View className="flex-col justify-center items-center">
              <Text className="text-white text-2xl font-bold">20%</Text>
              <Text className="text-white text-lg">Wind</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

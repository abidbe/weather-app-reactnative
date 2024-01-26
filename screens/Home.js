import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "../themes";
import { MagnifyingGlassIcon, SunIcon } from "react-native-heroicons/outline";
import { MapPinIcon, CalendarIcon } from "react-native-heroicons/solid";
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import { weatherImages } from "../constants";
import * as Progress from "react-native-progress";
import { storeData, getData } from "../utils/asyncStorage";

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLocation = (location) => {
    console.log("location :", location);
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeatherForecast({ cityName: location.name, days: "7" }).then(
      (data) => {
        setWeather(data);
        setLoading(false);
        storeData('city', location.name);
        console.log("data :", data);
      }
    );
  };

  const handleSearch = (text) => {
    if (text.length > 1) {
      fetchLocations({ cityName: text }).then((data) => {
        setLocations(data);
      });
    }
  };

  useEffect(() => {
    fetchMyLocation();
  }, []);

  const fetchMyLocation = async () => {
    let myCity = await getData('city');
    let cityName = 'Bantul';
    if(myCity){
      cityName = myCity;
    }
    fetchWeatherForecast({ cityName, days: "7" }).then((data) => {
      setWeather(data);
      setLoading(false);
      console.log("data :", data);
    });
  };

  const debouncedSearch = useCallback(debounce(handleSearch,10), []);

  const { current, location } = weather;

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        source={require("../assets/city.png")}
        className="absolute h-full w-full"
        blurRadius={30}
      />
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Progress.CircleSnail color={"white"} thickness={5} size={80}/>
        </View>
      ) : (
        <SafeAreaView className="flex flex-1 ">
          {/* search section */}
          <View className="mx-4 relative z-50" style={{ height: "7%" }}>
            <View
              className="flex-row justify-end items-center rounded-full mt-3"
              style={{
                backgroundColor: showSearch
                  ? theme.bgWhite(0.2)
                  : "transparent",
              }}
            >
              {showSearch ? (
                <TextInput
                  onChangeText={debouncedSearch}
                  placeholder="Search City"
                  placeholderTextColor={"lightgray"}
                  className="flex-1 px-5 py-4  rounded-full text-white"
                />
              ) : null}
              <TouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
                style={{ backgroundColor: theme.bgWhite(0.3) }}
                className="rounded-full p-2 m-1"
              >
                <MagnifyingGlassIcon color="white" />
              </TouchableOpacity>
            </View>
            {locations.length > 0 && showSearch ? (
              <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                {locations.map((location, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleLocation(location)}
                      className="flex-row items-center px-5 py-3"
                    >
                      <MapPinIcon color="gray" />
                      <Text className="ml-2 text-gray-600">
                        {location.name}, {location.region}, {location.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
          {/* forecast section */}
          <View className="flex-1 justify-around items-center mx-4 mb-2">
            <View className="flex-row items-center">
              <Text className="text-white text-2xl font-bold">
                {location?.name}
                <Text className="text-slate-300 text-xl font-normal">
                  , {location?.country}
                </Text>
              </Text>
            </View>
            {/* weather image */}
            <View className="flex-row items-center">
              <Image
                source={weatherImages[current?.condition?.text]?weatherImages[current?.condition?.text]:weatherImages['other']}
                className="h-52 w-52"
              />
            </View>
            {/* celcius */}
            <View className="flex-col justify-center items-center">
              <Text className="text-white text-4xl font-bold justify-center">
                {current?.temp_c}°
                <Text className="text-white text-3xl font-normal">C</Text>
              </Text>
              <Text className="text-white text-2xl font-normal">
                {current?.condition?.text}
              </Text>
            </View>
            {/* weather info */}
            <View className="flex-row justify-around items-center w-full">
              <View className="flex-1 flex-row space-x-2 justify-center items-center">
                <Image
                  source={require("../assets/icons/wind.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white text-lg">
                  {current?.wind_kph}km
                </Text>
              </View>
              <View className="flex-1 flex-row space-x-2 justify-center items-center">
                <Image
                  source={require("../assets/icons/drop.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white text-lg">{current?.humidity}%</Text>
              </View>
              <View className="flex-1 flex-row space-x-2 justify-center items-center">
                <Image
                  source={require("../assets/icons/sun.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white text-lg">{weather?.forecast?.forecastday[0]?.astro?.sunrise}</Text>
              </View>
            </View>
          </View>
          {/* forecast for the next day */}
          <View className="mb-2 space-y-3">
            <View className="flex-row items-center mx-5 space-x-2">
              <CalendarIcon color="white" />
              <Text className="text-white text-base">Daily forecast</Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              {weather?.forecast?.forecastday?.map((item, index) => {
                let date = new Date(item.date);
                let day = date.getDay();
                let dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                item.date = dayList[day];
                return (
                  
                  <View
                    className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                    style={{ backgroundColor: theme.bgWhite(0.15) }}
                    key={index}
                  >
                    <Image
                      source={weatherImages[item.day.condition.text]?weatherImages[item.day.condition.text]:weatherImages['other']}
                      className="h-11 w-11"
                    />
                    <Text className="text-white text-lg">{item.date}</Text>
                    <Text className="text-white text-lg">
                      {item?.day?.avgtemp_c}°
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

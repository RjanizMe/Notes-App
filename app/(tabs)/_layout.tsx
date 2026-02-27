import { isContainerGridAtom } from "@/atoms/taskAtom";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Tabs } from "expo-router";
import { useAtom } from "jotai";
import { TouchableOpacity } from "react-native";

export default function TabsLayout() {
  const [isGrid, setGrid] = useAtom(isContainerGridAtom);

  const toggleLayout = () => {
    setGrid((prev) => !prev);
  };

  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "left",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Tasks",

          headerRight: () => (
            <TouchableOpacity
              onPress={toggleLayout}
              style={{ marginRight: 12, padding: 6 }}
            >
              {isGrid ? (
                <MaterialCommunityIcons
                  name="view-list-outline"
                  size={30}
                  color="black"
                />
              ) : (
                <SimpleLineIcons name="grid" size={22} color="black" />
              )}
            </TouchableOpacity>
          ),

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-variant"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

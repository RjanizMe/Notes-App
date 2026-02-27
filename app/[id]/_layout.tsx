import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, router, useLocalSearchParams, usePathname } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function RootLayout() {
  const { id } = useLocalSearchParams();
  const path = usePathname();

  // route checks
  const isHomePage = path === "/";
  const isAddPage = path.endsWith("/add");
  const isEditPage = path.endsWith("/edit");
  const isDetailsPage = id && !isEditPage && !isAddPage && !isHomePage;

  return (
    <Stack
      screenOptions={{
        header: () => (
          <View className="pt-safe bg-white px-4 pb-3 flex-row items-center justify-between">
            {!isHomePage ? (
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex-row items-center gap-1"
              >
                <Ionicons name="chevron-back" size={26} color="blue" />
                <Text className="text-xl text-blue-500 font-semibold">
                  Back
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={{ width: 60 }} />
            )}

            <Text className="text-xl font-semibold">
              {isHomePage
                ? "Tasks"
                : isAddPage
                  ? "Add Task"
                  : isEditPage
                    ? "Edit Task"
                    : "Details"}
            </Text>

            {isDetailsPage ? (
              <TouchableOpacity onPress={() => router.push(`/${id}/edit`)}>
                <Text className="text-blue-500 font-semibold text-xl">
                  Edit
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={{ width: 60 }} />
            )}
          </View>
        ),
      }}
    />
  );
}

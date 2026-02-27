import { isContainerGridAtom, taskAtom } from "@/atoms/taskAtom";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [tasks, setTasks] = useAtom(taskAtom);
  const [isGrid] = useAtom(isContainerGridAtom);
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const openDeleteModal = (id: number) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== selectedId));
    setShowModal(false);
    setSelectedId(0);
  };

  return (
    <View className="flex-1 pt-safe px-2">
      <FlatList
        data={tasks}
        key={isGrid ? "grid" : "list"}
        numColumns={isGrid ? 2 : 1}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={isGrid ? { gap: 8 } : undefined}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/${item.id}/view-details`)}
            className={`
              border rounded-xl p-4 m-1 bg-white
              flex-row justify-between items-center
              ${isGrid ? "flex-1" : ""}
            `}
          >
            {/* TEXT WRAPPER FIX */}
            <View className="flex-1 mr-2">
              <Text
                className="font-semibold text-base"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.title}
              </Text>
            </View>

            <TouchableOpacity onPress={() => openDeleteModal(item.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                size={24}
                color="Gray"
              />
            </TouchableOpacity>
          </Pressable>
        )}
      />

      <Modal visible={showModal} transparent animationType="fade">
        <View className="flex-1 bg-black/40 justify-center items-center px-6">
          <View className="bg-white w-full rounded-2xl p-6">
            <Text className="text-xl font-bold text-center mb-2">
              Delete Task
            </Text>

            <Text className="text-gray-500 text-center mb-6">
              Are you sure you want to delete this task?
            </Text>

            <View className="flex-row justify-center gap-3">
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                className="bg-gray-200 px-6 py-3 rounded-xl"
              >
                <Text className="font-semibold">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmDelete}
                className="bg-red-500 px-6 py-3 rounded-xl"
              >
                <Text className="text-white font-semibold">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

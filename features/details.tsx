import { taskAtom } from "@/atoms/taskAtom";
import { router, useLocalSearchParams } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function ListDetail() {
  const { id } = useLocalSearchParams();
  const [tasks, setTasks] = useAtom(taskAtom);
  const [showModal, setShowModal] = useState(false);

  const task = tasks.find((t) => t.id === Number(id));

  const confirmDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== Number(id)));
    setShowModal(false);
    router.back();
  };

  if (!task) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text className="text-lg text-gray-500">Task not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 px-6 pt-10">
      {/* TASK CARD */}
      <View className="bg-white rounded-2xl p-5 shadow-sm">
        <Text className="text-2xl font-bold text-gray-800">{task.title}</Text>

        <View className="h-px bg-gray-200 my-3" />

        <Text className="text-base text-gray-600">
          {task.notes || "No notes provided."}
        </Text>
      </View>

      {/* DELETE BUTTON */}
      <View className="absolute bottom-10 left-6 right-6">
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          className=" py-4 rounded-2xl flex-row items-center justify-center gap-2"
        >
          <Text className="text-red-600 font-semibold text-xl pb-safe">
            Delete Task
          </Text>
        </TouchableOpacity>
      </View>

      {/* DELETE MODAL */}
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

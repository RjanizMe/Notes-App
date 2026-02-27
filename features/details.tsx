import { taskAtom } from "@/atoms/taskAtom";
import { router, useLocalSearchParams } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

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
    <View className="flex-1 bg-gray-100">
      {/* CONTENT */}
      <ScrollView
        className="flex-1 px-6 pt-safe"
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white rounded-2xl p-6 shadow-sm">
          {/* TITLE */}
          <Text className="text-2xl font-bold text-gray-800">{task.title}</Text>

          {/* DIVIDER */}
          <View className="h-px bg-gray-200 my-4" />

          {/* NOTES */}
          <Text className="text-base text-gray-600 leading-relaxed">
            {task.notes || "No notes provided."}
          </Text>
        </View>
      </ScrollView>

      {/* DELETE BUTTON */}
      <View className="px-6 pb-safe pt-3 bg-gray-100">
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          className=" py-5 rounded-2xl active:opacity-80"
        >
          <Text className="text-red-500 font-semibold text-lg text-center">
            Delete Task
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} transparent animationType="fade">
        <View className="pb-safe flex-1 bg-black/40 justify-center items-center px-6">
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
                className="bg-gray-200 px-6 py-3 rounded-xl flex-1"
              >
                <Text className="font-semibold text-center">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmDelete}
                className="bg-red-500 px-6 py-3 rounded-xl flex-1"
              >
                <Text className="text-white font-semibold text-center">
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

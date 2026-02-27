import { taskAtom } from "@/atoms/taskAtom";
import { router, useLocalSearchParams } from "expo-router";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditTask() {
  const { id } = useLocalSearchParams();
  const taskId = Number(id);

  const [tasks, setTasks] = useAtom(taskAtom);

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  // FETCH DATA
  useEffect(() => {
    const existingTask = tasks.find((t) => t.id === taskId);

    if (existingTask) {
      setTitle(existingTask.title);
      setNotes(existingTask.notes);
    }
  }, [taskId, tasks]);

  // UPDATE TASK
  const save = () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Title is required");
      return;
    }

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              title: title.trim(),
              notes: notes.trim(),
            }
          : t,
      ),
    );

    router.back();
  };

  return (
    <View className="pt-safe p-4 flex-1 bg-gray-100 px-6">
      <Text className="text-lg font-semibold mb-2">Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
        placeholderTextColor="#94a3b8"
        className="border-gray-200 rounded-2xl px-5 py-2 text-lg mb-6 bg-[#0000000D]"
      />

      <Text className="text-lg font-semibold mb-2">Notes</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="Enter notes"
        placeholderTextColor="#94a3b8"
        multiline
        textAlignVertical="top"
        className="border-gray-200 rounded-2xl px-5 py-4 text-lg h-80 bg-[#0000000D]"
      />

      <View className="absolute bottom-10 left-6 right-6">
        <TouchableOpacity
          onPress={save}
          className="bg-blue-600 py-5 rounded-2xl shadow-lg"
        >
          <Text className="text-center text-white text-lg font-semibold">
            Save Task
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

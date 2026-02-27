import { taskAtom } from "@/atoms/taskAtom";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [, setTasks] = useAtom(taskAtom);

  const save = () => {
    if (!title.trim()) {
      setError("Title is required!");
      return;
    }

    setError("");

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: title.trim(),
        notes: notes.trim(),
      },
    ]);

    setTitle("");
    setNotes("");

    router.back();
  };

  return (
    <View className="pt-safe flex-1 bg-gray-100 px-6">
      <Text className="text-lg font-semibold mb-2 mt-4">Title</Text>

      <TextInput
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          if (error) setError("");
        }}
        placeholder="Enter task title"
        placeholderTextColor="#94a3b8"
        className={`rounded-2xl px-5 py-3 text-lg bg-[#0000000D]
          ${error ? "border border-red-500" : "border border-transparent"}
        `}
      />

      {/* ERROR TEXT */}
      {error ? <Text className="text-red-500 mt-1 ml-1">{error}</Text> : null}

      <Text className="text-lg font-semibold mb-2 mt-6">Notes</Text>

      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="Enter notes about the task"
        placeholderTextColor="#94a3b8"
        multiline
        textAlignVertical="top"
        className="rounded-2xl px-5 py-4 text-lg h-80 bg-[#0000000D]"
      />

      <View className="absolute bottom-10 left-6 right-6">
        <TouchableOpacity
          onPress={save}
          className="bg-blue-600 py-5 rounded-2xl shadow-lg active:opacity-80"
        >
          <Text className="text-center text-white text-lg font-semibold">
            Save Task
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

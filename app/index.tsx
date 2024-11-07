import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { useState } from "react";

interface Task {
  key: string;
  text: string;
}

const Index = () => {
  const [enteredTaskText, setEnteredTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const taskInputHandler = (enteredText: string) => {
    setEnteredTaskText(enteredText);
  };

  const addTaskHandler = () => {
    if (enteredTaskText.trim()) {
      setTasks((currentTasks) => [
        ...currentTasks,
        { text: enteredTaskText.trim(), key: Math.random().toString() },
      ]);
      setEnteredTaskText("");
    }
  };

  const deleteTaskHandler = (id: any) => {
    setTasks((currentTasks) => {
      return currentTasks.filter((task) => task.key !== id);
    });
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Input task"
          value={enteredTaskText}
          onChangeText={taskInputHandler}
        />
        <Button title="Add Task" onPress={addTaskHandler} color={"#4EA6C2"} />
      </View>
      <View style={styles.taskContainer}>
        <Text style={styles.taskTitle}>List of Tasks</Text>
        <FlatList
          data={tasks}
          renderItem={(itemData) => {
            return (
              <View style={styles.taskItem}>
                <Text style={styles.taskText}>{itemData.item.text}</Text>
                <Pressable
                  style={styles.deletebutton}
                  android_ripple={{ color: "#dddddd" }}
                  onPress={() => deleteTaskHandler(itemData.item.key)}
                >
                  <Text style={styles.taskText}>X</Text>
                </Pressable>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 16,
    backgroundColor: "#F6FCFC",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#ADD8E6",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ADD8E6",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  taskContainer: {
    flex: 4,
  },
  taskTitle: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
  },
  taskItem: {
    margin: 8,
    padding: 16,
    borderRadius: 6,
    backgroundColor: "#c24e77",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskText: {
    color: "white",
  },
  deletebutton: {
    width: 20,
    height: 20,
  },
});

export default Index;

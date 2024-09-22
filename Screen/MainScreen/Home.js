// Home.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TaskContext } from './TaskContext';

const Home = ({ navigation }) => {
  const { addTask } = useContext(TaskContext);
  const [taskText, setTaskText] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const isValidDate = (dateString) => {
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    return regex.test(dateString);
  };

  const addNewTask = () => {
    if (taskText.trim() !== '' && isValidDate(dueDate)) {
      const newTask = {
        id: new Date().getTime().toString(),
        text: taskText,
        description: taskDescription,
        dueDate: dueDate,
        completed: false,
      };
      addTask(newTask);
      setTaskText('');
      setTaskDescription('');
      setDueDate('');
      navigation.navigate("Details");
    } else {
      Alert.alert('Invalid Date', 'Please enter a valid date (DD-MM-YYYY).');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task"
        value={taskText}
        onChangeText={(text) => setTaskText(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={taskDescription}
        onChangeText={(text) => setTaskDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Due Date (DD-MM-YYYY)"
        value={dueDate}
        onChangeText={(date) => setDueDate(date)}
      />
      <TouchableOpacity style={styles.addButton} onPress={addNewTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default Home;

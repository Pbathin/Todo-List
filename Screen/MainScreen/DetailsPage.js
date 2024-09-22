// DetailsPage.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { TaskContext } from './TaskContext';

const DetailsPage = ({ route }) => {
  const { tasks, completeTask, deleteTask } = useContext(TaskContext);

  const renderTaskItem = ({ item }) => (
    <View style={[styles.taskContainer, item.completed && styles.completedTask]}>
      <Text style={styles.taskText}>{item.text}</Text>
      {item.description && <Text style={styles.taskSubText}>Description: {item.description}</Text>}
      {item.dueDate && <Text style={styles.taskSubText}>Due Date: {item.dueDate}</Text>}
      {item.completed && item.completionTime && (
        <Text style={styles.taskSubText}>
          Completed on: {item.completionTime.toLocaleString('en-IN')}
        </Text>
      )}
      <View style={styles.buttonContainer}>
        {!item.completed && (
          <TouchableOpacity style={styles.completeButton} onPress={() => completeTask(item.id)}>
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDeleteTask(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const confirmDeleteTask = (taskId) => {
    Alert.alert(
      'Confirm Deletion',
      'You want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteTask(taskId),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskSubText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  completeButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  completedTask: {
    backgroundColor: 'lightgreen',
  },
});

export default DetailsPage;

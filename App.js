// App.js
import React from 'react';
import { TaskProvider} from './Screen/MainScreen/TaskContext'
import Navigation from './Screen/AuthNavigation';

const App = () => {
  return (
    <TaskProvider>
      <Navigation />
    </TaskProvider>
  );
};

export default App;

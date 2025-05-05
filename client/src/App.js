import React from 'react';
import ShowList from './components/ShowList';
import AddShow from './components/AddShow';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>TV!</h1>
      </header>
      <main>
        <AddShow />
        <ShowList />
      </main>
    </div>
  );
}

export default App;

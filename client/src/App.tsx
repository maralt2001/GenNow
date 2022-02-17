import React from 'react';
import './App.css';
import {Sidebar} from "./components/Sidebar";
import './components/Sidebar.css'
import {ContentContainer} from "./components/ContentContainer";
import './components/ContentContainer.css'
import './components/Headerbar.css'
import  './components/ImportData.css'


function App() {
  return (
      <div className="App">
        <Sidebar/>
        <ContentContainer/>
      </div>
  );
}

export default App;

import 'normalize.css'
import './App.css'
import { useState } from 'react';
import TodayWeather from './components/Weather'

function App() {

  return (
    <div className="App" >
      <TodayWeather />
    </div>
  )
}

export default App

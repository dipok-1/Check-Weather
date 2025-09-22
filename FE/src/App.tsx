
import './App.css'
import WeatherPage from './pages/weather'
import { BrowserRouter,Navigate,Route,Routes } from 'react-router-dom'
function App() {
  return(
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Navigate to="/weather/guwahati" replace />} />
        <Route path='/weather/:city' element={<WeatherPage/>}></Route>
       </Routes>
    </BrowserRouter>
  )
}

export default App

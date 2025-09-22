import { useNavigate, useParams } from "react-router-dom";
import Weatheroverview from "../component/weatheroverview"
import Forecastdisplay from "../component/forecastdisplay";
import WeatherAnalytics from "../component/weatherAnalytics";
import Taskform from "../component/taskform";
import ViewTask from "../component/viewtask";
import { useEffect, useState } from "react";
import axios from "axios";




const weatherToBackground = {
  Clear: 'bg-clear',
  Clouds: 'bg-clouds',
  Rain: 'bg-rain',
  Thunderstorm: 'bg-thunderstorm',
  Snow: 'bg-snow',
  Mist: 'bg-mist',
};

type Myweather = {
    weather:[
        {
        description: string,
        icon: string,
    }
],
    main:{
        temp:number,
        feels_like:number,
        temp_min:number,
        temp_max:number,
        humidity:number,
        pressure:number
    },
    wind:{
        speed:number,
        deg:number
    },
    sys:{
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone:number,
    name:string
}

type myforecast = {
    data:{
    list:[
        {
        dt:number,
        main:{
            temp:number
        },
        weather:[
            {
            description:string,
            icon:string
        }
    ]
    }
]
    }
}

function WeatherPage(){
    const { city } = useParams();
    const [data, setData] = useState<Myweather>();
    const [userinput,setinput] = useState("")
    const [forecastdata,setfdata] = useState<myforecast>()
    const navigate = useNavigate()
function handlesearch (){
    
   navigate(`/weather/${userinput}`)
}

  useEffect(() => {
    if (!city) return;
    const fetchdata = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/weather/${city}`);
        const forecastresponse = await axios.get(`http://localhost:3000/api/forecast/${city}`)
        setData(response.data);
        console.log(forecastresponse.data)
        setfdata(forecastresponse.data)
      } catch (error) {
        console.log(error);
        alert('Failed to fetch weather data');
      }
    };
    fetchdata();
  }, [city]);

  if (!data) return <div>Loading...</div>;

  const condition = data.weather[0].description as keyof typeof weatherToBackground;
  const bgClass = weatherToBackground[condition] || 'bg-clear';

   return(
   <div className={`h-[100vh] flex flex-col ${bgClass} overflow-y-auto p-4`}>
    
      <div className="h-[40vh] p-4 flex justify-between items-center relative">
        <Weatheroverview data={data} />
        <div className="absolute top-0 right-0 p-4 flex gap-2 text-white">
            <div className="flex gap-3"><input type="text" placeholder="search.." value={userinput} onChange={e=>setinput(e.target.value)} className="border rounded p-2"/><button onClick={handlesearch} className="border p-2 rounded">Search</button></div>
           <Taskform/>
            <ViewTask/>
        </div>
      </div>
      <div className="h-[50vh]  p-4">
        <Forecastdisplay forecastdata ={forecastdata}/>
      </div>
      <div className="h-[100vh]  p-4 ">
        <WeatherAnalytics forecastdata ={forecastdata}/>
      </div>
    </div>
   )
}
export default WeatherPage
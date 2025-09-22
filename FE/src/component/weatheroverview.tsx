


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


function Weatheroverview({ data }: { data: Myweather }){

 
const nowUTC = Date.now() + new Date().getTimezoneOffset() * 60000;


const localTime = new Date(nowUTC + data.timezone * 1000);


const formattedLocalTime = localTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();

  const sunrise = new Date((data.sys.sunrise + data.timezone) * 1000);
  const sunset = new Date((data.sys.sunset + data.timezone) * 1000);


  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;


    return(
 <div className=" flex gap-5   max-w-md  p-6   bg-white/30  text-gray-900 rounded-xl  shadow-xl  border border-white/30">
    <div>
      <div className="flex gap-4 items-center mb-4">
        <img src={iconUrl} alt={data.weather[0].description} className="w-12 h-12" />
        <h2 className="text-2xl font-semibold">{data.name}, {data.sys.country}</h2>
     </div>
        <p className="text-sm text-white/80 mb-2">Local Time: {formattedLocalTime}</p>

       

       <p className="text-5xl font-bold mb-1">{Math.round(data.main.temp)}°C</p>

       <p className="capitalize tracking-wide mb-6">{data.weather[0].description}</p>
    </div>
  <div className="grid grid-cols-2 gap-y-2 text-[16px] text-black">
    <span>Feels like:</span> <span>{data.main.feels_like}°C</span>
    <span>Min / Max:</span> <span>{Math.round(data.main.temp_min)}°C / {Math.round(data.main.temp_max)}°C</span>
    <span>Humidity:</span> <span>{data.main.humidity}%</span>
    <span>Pressure:</span> <span>{data.main.pressure} hPa</span>
    <span>Wind:</span> <span>{data.wind.speed} m/s, {data.wind.deg}°</span>
    <span>Sunrise:</span> <span>{sunrise.toUTCString().slice(17, 22)} UTC</span>
    <span>Sunset:</span> <span>{sunset.toUTCString().slice(17, 22)} UTC</span>
  </div>
</div>

    )
}
export default Weatheroverview
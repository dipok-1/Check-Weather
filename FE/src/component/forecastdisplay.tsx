

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


function Forecastdisplay ({forecastdata}:{forecastdata?:myforecast}) {
    
return (
    <div className="flex overflow-x-auto gap-4 p-4">
      {forecastdata?.data.list.map((item) => (
        <div key={item.dt} className="flex flex-col items-center min-w-[90px] p-3 bg-white/30 backdrop-blur rounded-lg shadow-md">
          <p className="text-xs">
            {new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt={item.weather[0].description}
            className="w-12 h-12"
          />
          <p className="text-lg font-semibold">{Math.round(item.main.temp)}°C</p>
          <p className="capitalize text-sm">{item.weather[0].description}</p>
        </div>
      ))}
    </div>
  )
}

export default Forecastdisplay
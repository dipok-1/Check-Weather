import {LineChart,XAxis,YAxis,Tooltip,CartesianGrid,Line,ResponsiveContainer } from 'recharts'





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

function WeatherAnalytics ({forecastdata}:{forecastdata?:myforecast}){
    if (!forecastdata) return null;
    const data = forecastdata.data.list?.map((item)=>(
        {
            time:new Date(item.dt * 1000).toLocaleString([],{hour: '2-digit', minute: '2-digit'}),
            temp:Math.round(item.main.temp)
        }
    ))
     return(
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={['dataMin - 5', 'dataMax + 5']} unit="°C"/>
        <Tooltip />
        <Line type="monotone" dataKey="temp" stroke="#8884d8" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
     )
}
export default WeatherAnalytics
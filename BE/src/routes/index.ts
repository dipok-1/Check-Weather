import axios from 'axios';
import express from 'express'
import taskmodel from '../model/task';
const router = express.Router()

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
type cachedata = {
    weather:Myweather,
    forecast:myforecast
}



type CachedItem<T> = {
  data: T;
  timestamp: number;
};



const cache:{ [key: string]: CachedItem<cachedata> } = {}
const TTL = 10 * 60 * 1000;




type myfilter = {
    status?: string;
    category?: string;
}

router.get('/weather/:city',async(req,res)=>{
    const {city} = req.params;
    try {
        const cached = cache[`weather_${city}`];
        if(cached && (Date.now() - cached.timestamp < TTL)){
            console.log('cachehit');
            return res.status(200).json(cached.data)
        }
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`)
        cache[`weather_${city}`] = {
            data:response.data,
            timestamp:Date.now()
        }
        res.json(response.data);
    } catch (error) {
        console.log(error)
    }
})
router.get('/forecast/:city',async(req,res)=>{
    const {city} = req.params;
    try {
        const cached = cache[`forecast_${city}`];
        if(cached && (Date.now() - cached.timestamp < TTL)){
            console.log('cachehit')
            return res.status(200).json(cache[`forecast_${city}`])
        }
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}&units=metric`)
        cache[`forecast_${city}`] = {
            data:response.data,
            timestamp:Date.now()
        }
        res.json(response.data);
    } catch (error) {
        console.log(error)
    }
})

// Users task
router.post('/task',async(req,res)=>{
    try {
        const {title,description,category} = req.body;
        if(!title || !description ||!category) return res.status(400).json({msg:'Fields are empty.'})
        await taskmodel.create({
           title,
           description,
           category
        })
        res.status(200).json({msg:"successfully created task"})
    } catch (error) {
        res.status(500).json({msg:'server error'})
    }
})

router.get('/tasks',async(req,res)=>{
    const  {status,category} = req.query;
    let filter: myfilter = {};
    if(status && typeof status === 'string') filter.status = status
    if(category && typeof category === 'string') filter.category = category
     try {
        const response = await taskmodel.find(filter)
        res.status(200).json(response)
     } catch (error) {
        console.log(error)
        res.status(500).json({msg:"server error"})
     }
})

router.put('/tasks/:id',async(req,res)=>{
    const {id} = req.params
    const {title,description,category,status} = req.body
    if(!title || !description ||!category||!status) return res.status(400).json({msg:"fields are empty"})
    try {
        await taskmodel.findByIdAndUpdate(id,{
            title,
            description,
            category,
            status
        },{ new: true })
        res.status(200).json({msg:"updated"})
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
})

router.delete('/tasks/:id',async(req,res)=>{
    const {id} = req.params
   try {
    await taskmodel.findByIdAndDelete(id)
    res.status(200).json({msg:"deleted"})
   } catch (error) {
    res.status(500).json({msg:"server error"})
   }
})

export default router
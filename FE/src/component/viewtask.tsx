import axios from "axios"
import { useEffect, useState } from "react"
import Editform from "./editform"
import Deletetask from "./deletehandling"
type mytask ={
    _id:string
    title:string,
    description:string,
    category:string,
    status:string,
    createdAt:Date,
    updatedAt:Date
}



function ViewTask(){
const [open,setopen] = useState(false)
const [loading, setLoading] = useState(true)
const [data,setdata] = useState<mytask[]>([])
const [editingTask, setEditingTask] = useState<mytask | null>(null);
const [filter,setfilter] = useState("")
const [editOpen, setEditOpen] = useState(false);


function toggleForm (){
       setopen(!open)
}
useEffect(()=>{
    const fetchdata = async()=>{
     try {
        const response = await axios.get(`http://localhost:3000/api/tasks?status=${filter}`)
        setdata(response.data)
     } catch (error) {
        alert("failed to get data")
     }
     setLoading(false)
    }
    fetchdata()
},[filter])
if (loading) return <h1>Loading ..</h1>;


   return(
<div>
  <button onClick={toggleForm} className="border rounded p-2 bg-blue-500 text-white">
    View List
  </button>

  {open && (data.length >0? (
    
<div className="fixed inset-0 bg-white bg-opacity-60 flex flex-col items-center justify-center z-50 text-black p-4 overflow-auto">
    <div className=" flex gap-2">
        <label >Filter: </label>
    <select value={filter} onChange={e=>setfilter(e.target.value)}>
        <option value="">-- Select Category --</option>
        <option value="pending">Pending</option>
        <option value="checked">Checked</option>
    </select>
    </div>
  <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4">
    {data.map((item, index) => (
        <>
      <div
        key={index}
        className="bg-white rounded shadow-lg p-6 flex flex-col gap-2 border border-gray-200 min-w-[250px]"
      >
        <h2 className="font-bold text-lg break-words">Title: {item.title}</h2>
        <p className="text-gray-700">Description: {item.description}</p>
        <p>
          <span className="font-semibold">Category:</span> {item.category}
        </p>
        <p>
          <span className="font-semibold">Status:</span> {item.status}
        </p>
        <p>
          <span className="font-semibold">Created At:</span>{' '}
          {new Date(item.createdAt).toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Last Updated:</span>{' '}
          {new Date(item.updatedAt).toLocaleString()}
        </p>
         <button
           onClick={() => {
             setEditingTask(item);
             setEditOpen(true);
           }}
           className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
         >
           Edit
         </button>         
        <Deletetask data={item}/>
      </div>
      </>
    ))}

    {editOpen && editingTask && (
  <Editform
    data={editingTask}
    onClose={() => setEditOpen(false)}
  />
)}

  </div>
  
</div>

  ):(
     <div className="fixed inset-0 bg-white bg-opacity-60 flex flex-col items-center justify-center z-50 text-black p-4 overflow-auto">
          <h1>No data Found.</h1>
          <button
    onClick={toggleForm}
    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  >
    Exit
  </button>
      <div className=" flex gap-2">
        <label >Filter: </label>
    <select value={filter} onChange={e=>setfilter(e.target.value)}>
        <option value="">-- Select Category --</option>
        <option value="pending">Pending</option>
        <option value="checked">Checked</option>
    </select>
    </div>
        </div>
  ))}
</div>

    
   )
}
export default ViewTask
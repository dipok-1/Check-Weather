import axios from "axios";



type mytask = {
    _id:string
  title: string;
  description: string;
  category: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

function Deletetask ({data}:{data:mytask}){

    function handledelete(){
       const sendRequest = async()=>{
        try {
            const response = await axios.delete(`http://localhost:3000/api/tasks/${data._id}`)
            alert(response.data.msg)
            
        } catch (error) {
            alert('failed to delete')
        }
  }
sendRequest()
    }
   


  
    return(
        <button onClick={handledelete} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Delete</button>
    )
}
export default Deletetask
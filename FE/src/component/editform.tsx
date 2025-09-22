import axios from "axios";
import { useState, useEffect } from "react";

type mytask = {
    _id:string
  title: string;
  description: string;
  category: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

interface EditformProps {
  data: mytask;
  onClose: () => void;       // To close form modal from parent

}

function Editform({ data, onClose }: EditformProps) {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [status, setstatus] = useState("");

  
  useEffect(() => {
    if (data) {
      settitle(data.title);
      setdescription(data.description);
      setcategory(data.category);
      setstatus(data.status);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formdata = {title,description,category,status}
const sendRequest = async() =>{
    try {
        const response = await axios.put(`http://localhost:3000/api/tasks/${data._id}`,formdata)
        alert(response.data.msg)
        window.location.reload()
    } catch (error) {
        alert("failed to delete")
    }
}
sendRequest()
    
}

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-6 rounded shadow-lg max-w-md w-full"
      >
        <h2 className="text-xl font-semibold mb-4 text-white">
          Edit Task
        </h2>

        <label className="block mb-2 text-white">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            placeholder="check weather for London"
            required
            className="border p-2 w-full mt-1"
          />
        </label>

        <label className="block mb-4 text-white">
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder="check rain and humidity before going on trip"
            required
            className="border p-2 w-full mt-1"
          />
        </label>

        <label className="block mb-4 text-white">
          Category:
          <select
            className="bg-black text-white p-2 w-full mt-1"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="daily">daily</option>
            <option value="travel">travel</option>
          </select>
        </label>

        <label className="block mb-4 text-white">
          Status:
          <input
            type="text"
            value={status}
            placeholder="type 'checked'"
            onChange={(e) => setstatus(e.target.value)}
            required
            className="border p-2 w-full mt-1"
          />
        </label>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}


export default Editform

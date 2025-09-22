import axios from 'axios';
import  { useState } from 'react';

function Taskform() {
  const [isOpen, setIsOpen] = useState(false);
  const [title,settitle] = useState("")
  const [description,setdescription] = useState("")
  const [category,setcategory] = useState("")
  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formdata = {title,description,category}
    const sendRequest = async() =>{
        try {
            const response = await axios.post('http://localhost:3000/api/task',formdata);
            alert(response.data.msg)
            setIsOpen(false);
        } catch (error) {
            alert('failed')
        }
    }
    sendRequest()
  };

  return (
    <div>
      <button
        onClick={toggleForm}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Open Form
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-black p-6 rounded shadow-lg max-w-md w-full"
          >
            <h2 className="text-xl font-semibold mb-4">User Input Form</h2>

            <label className="block mb-2">
              Title:
              <input
                type="text"
                name="name"
                value={title}
                onChange={e=>settitle(e.target.value)}
                placeholder='check weather for London'
                required
                className="border p-2 w-full mt-1 "
              />
            </label>

            <label className="block mb-4">
              Description:
              <input
                type="text"
                name="email"
                value={description}
                onChange={e=>setdescription(e.target.value)}
                placeholder='check rain and humidity before going for trip'
                required
                className="border p-2 w-full mt-1"
              />
            </label>
            <label className="block mb-4">
              Category:
              <select name="category" className='bg-black' onChange={e=>setcategory(e.target.value)}>
                <option value="daily" >daily</option>
                <option value="travel" >travel</option>              
              </select>
            </label>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={toggleForm}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Taskform;

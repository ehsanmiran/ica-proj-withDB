import { createContext, useState } from "react";
import axios from 'axios';


const ApplicsContext = createContext();

function Provider ({ children }) {
  const [applications, setApplications] = useState([]);

  const fetchApplics = async () => {
    const response = await axios.get('http://localhost:3001/applications');
    const sortedApplications = response.data.sort((a, b) => {
      if (a.validDate < b.validDate) {
        return -1;
      }
      if (a.validDate > b.validDate) {
        return 1;
      }
      return 0;
    });
    setApplications(sortedApplications);
  };


  async function handleAddItem(formData) {
    try {
      const response = await axios.post(`http://localhost:3001/applications`, formData);
      const updatedApplications = [...applications, response.data];
      setApplications(updatedApplications);
    } catch (error) {
      console.error(error);
    }
  }



  async function handleEditItem(updatedItem) {
    try {
      const response = await axios.put(`http://localhost:3001/applications/${updatedItem.id}`, updatedItem);
      const updatedApplications = applications.map((item) => item.id === updatedItem.id ? response.data : item);
      setApplications(updatedApplications);
    } catch (error) {
      console.error(error);
    }
  }
  

  async function handleDeleteItem(id) {
    try {
      await axios.delete(`http://localhost:3001/applications/${id}`);
      const updatedApplications = applications.filter((item) => item.id !== id);
      setApplications(updatedApplications);
    } catch (error) {
      console.error(error);
    }
  }

  const valueToShare ={
    applications,
    fetchApplics,
    handleAddItem,
    handleEditItem,
    handleDeleteItem
  };

  return <ApplicsContext.Provider value={valueToShare}>
    {children}
  </ApplicsContext.Provider>
}

export {Provider};
export default ApplicsContext;
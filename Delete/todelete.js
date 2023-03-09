/* 
To update all the properties of a specific application using Axios and an edit component
with input fields, you can follow these steps:

Create an edit component with input fields that correspond to each property of an application.
For example, if the application has id, client, date, and more properties,
you could create input fields like this: 
*/

import React, { useState } from 'react';

const EditApplication = ({ application, onUpdate }) => {
  const [formData, setFormData] = useState(application);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    onUpdate(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>ID: </label>
      <input type="text" name="id" value={formData.id} onChange={handleChange} />

      <label>Client: </label>
      <input type="text" name="client" value={formData.client} onChange={handleChange} />

      <label>Date: </label>
      <input type="text" name="date" value={formData.date} onChange={handleChange} />

      {/* Add input fields for any other properties */}

      <button type="submit">Update</button>
    </form>
  );
}

export default EditApplication;




/*
    In your root component (App.js), render the EditApplication component for the
    application you want to update, passing the application object as a prop,
    along with a function that handles the update. For example:
*/


import React, { useState } from 'react';
import axios from 'axios';
import EditApplication from './EditApplication';

const App = () => {
  const [applications, setApplications] = useState({
    "applications": [
      {
        "id": "1",
        "client": "client1",
        "date": "date1",
        ...more properties
      },
      {
        "id": "2",
        "client": "client2",
        "date": "date2",
        ...more properties
      },
      {
        "id": "3",
        "client": "client3",
        "date": "date3",
        ...more properties
      }
    ]
  });

  const handleUpdate = updatedApplication => {
    axios.put(`http://your-api-url/applications/${updatedApplication.id}`, updatedApplication)
      .then(response => {
        console.log(response.data);
        // Update the state with the updated application
        const updatedApplications = applications.applications.map(application => {
          if (application.id === updatedApplication.id) {
            return updatedApplication;
          }
          return application;
        });
        setApplications({ applications: updatedApplications });
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      {applications.applications.map(application => (
        <div key={application.id}>
          <h2>Application {application.id}</h2>
          <p>Client: {application.client}</p>
          <p>Date: {application.date}</p>
          {/* Render any other properties here */}
          <EditApplication application={application} onUpdate={handleUpdate} />
        </div>
      ))}
    </div>
  );
}

export default App;


/*
    In this example, we render the EditApplication component for each application 
    in the state, passing the application object as a prop and the handleUpdate 
    function as a prop. The handleUpdate function sends a PUT request to the API 
    with the updated application object, and then updates the state with 
*/
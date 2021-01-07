import React , {useState} from 'react'
import axios from 'axios';

const FormUpload = () => {

  const [values, setValues] = useState({
    topic_name : "", 
    singlenote : "",
    token : ""
  })

  const handleChange = (props) => (event) => {
    setValues({...values, [props] :event.target.value})
    console.log(values)
  }

  const handleFileChange = (props) => (event) => {
      console.log(event.target.files[0]);
   setValues({...values, [props] :  event.target.files[0] })
    console.log(values)
  }
 
  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData();
    formData.append("enctype", "multipart/form-data");
    formData.append("topic_name", values.topic_name );
    formData.append("singlenote", values.singlenote);

    axios({
        // url is the server URL that will be used for the request
        url: "/api/notes/users-upload-single-notes",
  
        // method is the request method to be used when making the request
        method: "post",
  
        // baseURL will be prepended to url unless url is absolute.
        baseURL: "https://shattak.com",
  
        // headers are custom headers to be sent
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer" + " " + values.token,
        },
  
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent.loaded + " " + progressEvent.total);
  
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log("percentCompleted = " + percentCompleted);
        
        },
  
        // data is the data to be sent as the request body
        data: formData,
      })
        .then((result) => {
          console.log(result);
          alert("Your Notes are Succefully Uploaded");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert("Your Notes are Not Uploaded");
  
          // window.location.reload();
        });
  

  }


    return (
        <div>
            <h1>Fill the form regarding the notes upload</h1>

            <form onSubmit={handleSubmit} >
             <label>
                Topic Name : {'    '}
                  <input type="text" name="topic_name" onChange={handleChange('topic_name')} />
              </label><br /><br />
              <label>
              Token : {'    '}
              <input type="text" name="token" onChange={handleChange('token')}/>
              </label><br /><br />

              <input type="file" id="myFile" name="singlenote"  onChange={handleFileChange('singlenote')} /> <br /><br />

              <button type = "submit"> Upload a file </button>
      
                        {/* <input type="submit" value="Submit"  /> */}
  
            </form>
        </div>
    )
}

export default FormUpload

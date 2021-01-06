import React , {useState} from 'react'
import {useDropzone} from 'react-dropzone';

const File_form = () => {

  const [values, setValues] = useState({
    topic_name : "", 
    singlenote : "",
    token : ""
  })

  const handleChange = (props) => (event) => {
    setValues({...values, [props] :event.target.value})
    console.log(values)
  }
  const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
    return (
        <div>
            <h1>Fill the form regarding the notes upload</h1>

            <form>
             <label>
                Topic Name : {'    '}
                  <input type="text" name="topic_name" onChange={handleChange('topic_name')} />
              </label><br /><br />
              <label>
              Token : {'    '}
              <input type="text" name="token" onChange={handleChange('token')}/>
              </label><br /><br />

              <h1>File Upload System</h1>
                <div {...getRootProps({className: 'dropzone'})}>
                  <input {...getInputProps()}  />
                    <p>Drag 'n' drop some files here</p>
                      <button type="button" onClick={open}>
                        Open File Dialog
                      </button>
                </div>
                      <aside>
                        <h4>Files</h4>
                          <ul>{files}</ul>
                      </aside>
      
                        <input type="submit" value="Submit" />
  
            </form>
        </div>
    )
}

export default File_form

import logo from './logo.svg';
import './App.css';
import './normalize.css';
import { useState, useEffect } from 'react';

const fetch = require("node-fetch");



function App() {
  const [value, setValue] = useState(null)
  const [message, setMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)
  const [models, setModels] = useState([])
  const [currentModel, setCurrentModel] = useState("gpt-3.5-turbo")

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setValue("")
  }


  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }

  const getModels = async (event) => {
    try{
      const response = await fetch('http://localhost:8000/models')
      const data = await response.json()
      // console.log("test")
      // console.log(data)
      setModels(data)
      // console.log(models)
    } catch (error){
      console.error(error)
    }
  }

  const getMessages = async (event) => {
    event.preventDefault()
    const options = {
      method: "POST",
      body : JSON.stringify({
        message: value,
        currentModel,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try{
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json()
      console.log(data)
      setMessage(data.choices[0].message)
    } catch (error){
      console.error(error)
    }
  }
  
  useEffect(() => {
    getModels();
  }, [])

  useEffect(() => {
    console.log(currentTitle, value, message)
    if(!currentTitle && value && message){
      setCurrentTitle(value)
    }
    if(currentTitle && value && message){
      setPreviousChats(prevChats => (
        [...prevChats, {title: currentTitle, role: "user", content: value}, 
        {title: currentTitle, role: message.role, content: message.content}]
      ))
    }
  }, [message, currentTitle])

  // console.log(previousChats)

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
  

  return (
    <div className="App">

      <aside className='sidebar'>
        <button onClick= {createNewChat} className='new_chat_button'>
          <span>+</span> 
          New Chat
        </button>
        <div className='models'>
          <select className='model_select' onChange={(event) => {setCurrentModel(event.target.value)}}>
            {models.map((model, index) => (
              <option key={model.id} value={model.id}>{model.id}
              </option>
            ))}
          </select>
        </div>
        <hr/>
        <ul className='history'>
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
      </aside>

      <section className='chatbox'>
        <ul className='chat_log'>
          {currentChat?.map((chatMessage, index) => <li key = {index}> 
            {chatMessage.role !== 'user' &&  <div className='profile_gpt'>
              <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={41}
                    height={41}
                    fill="none"
                    strokeWidth={1.5}
                    className="h-6 w-6"
                  >
                    <path
                      d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237Zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132Zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18Z"
                      fill="currentColor"
                    />
                </svg></div>}
            {chatMessage.role==='user' &&  <div className='profile'></div>}
            <div className='message'>
              {chatMessage.content}
            </div>
          </li>)}
        </ul>
        
        <div className='prompt_input'>
          <div className='input_textarea'>
            <input value = {value} placeholder='Send a message' onChange={(event) => setValue(event.target.value)}/>
            <div id="submit" onClick={getMessages}>➤</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

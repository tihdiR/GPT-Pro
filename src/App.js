import logo from './logo.svg';
import './App.css';
import './normalize.css';

function App() {
  return (
    <div className="App">
      <aside className='sidebar'>
        <div className='new_chat_button'>
          <span>+</span> 
          New Chat
        </div>
      </aside>
      <section className='chatbox'>
        
        <div className='prompt_input'>
          <textarea rows={1} className='input_textarea' placeholder='Send a message'>

          </textarea>
        </div>
      </section>
      
    </div>
  );
}

export default App;

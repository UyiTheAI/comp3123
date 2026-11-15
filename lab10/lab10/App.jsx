import {useState} from 'react';
import Student from './Student.jsx';
// TODO: import the funtional and class components to
// render within App Student, LoginClass, LoginFunction

function App() {
  const [showStudent, setShowStudent] = useState(true)

  return (
    <section>
        <h1>Lab Exercise 8 - Week 10 - React Lifecycle</h1>
        <button onClick={() =>{
            return setShowStudent(!showStudent)
        }} >{showStudent ? 'Hide' : 'Show'} Student</button>

        {showStudent && <Student studentNum={12345} firstName="Omoruyi" />}
    </section>
  )
}
export default App
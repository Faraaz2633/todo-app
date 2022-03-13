import { useEffect, useState } from 'react';
import './App.css';
import Todo from './Todo/Todo';

function App() {

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if(savedTodos) {
      return JSON.parse(savedTodos);
    }else{
      return []
    }
  });
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]) 

  const addTodo = () => {
    if(newTodo.length <= 0){
      alert("Can't add a empty todo, please fill something.")
      return;
    }
    setTodos([...todos, newTodo]);
    setNewTodo('');
  }
  const onPressEnter = (e) => {
    if(e.key === 'Enter'){
      if(newTodo.length <= 0){
        alert("Can't add a empty todo, please fill something.")
        return;
      }
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
}
  const deleteTodo = (index) => {
    const todoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    })
    console.log('Deleted')
    setTodos(todoList)
  }

  const setUpdate = (updatedTitle, id) => {
      let newList = todos.map((todo, ind) => {
        if(ind === id){
          todo = updatedTitle
        }
        console.log(id)
        return todo
      })
      setTodos(newList)
  }

  return (
    <div className='px-2 py-2 max-w-7xl m-auto App'>
      <h1 className="text-3xl font-bold underline my-8">
        Todo App
      </h1>
      <h3 className="text-xl font-bold">What needs to be done?</h3>
      <div className="p-1">
        <div className="py-2">
          <input 
            type="text" 
            className="px-4 py-1 mr-2 w-3/5 sm:w-3/4 text-md bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring outline-none focus:ring-blue-500" 
            onChange={(e) => setNewTodo(e.target.value)} 
            value={newTodo} 
            onKeyDown={onPressEnter}
            placeholder="Type here..."
          />
          <button
            type="submit"
            className="bg-blue-500 rounded-md text-white px-4 py-1"
            onClick={addTodo}
          >Add</button>
        </div>
      </div>
      <div>
        <ul className=' my-4'>
          
          { 
            (todos.length>0) && todos.map((todo, index) => (
              <Todo 
                value={todo}
                todos={todos}
                setTodos={setTodos}
                key={index}
                deleteTodo={() => deleteTodo(index)}
                setUpdate={setUpdate}
                id={index}
              />
            ))
          }
          {(todos.length <= 0) && (
            <h1 className="p-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500 w-3/4 m-auto ">
              Type something in the input field and click on add button.
            </h1>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;

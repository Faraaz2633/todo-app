import React, { useState } from 'react'

const Todo = ({ value, deleteTodo, setUpdate, id }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [completed, setCompleted] = useState(false);

    const editTodo = () => {
        console.log('Editing Mode');
        setIsEditing(!isEditing);
    }

    const onPressEnter = (e) => {
        if(e.key === 'Enter'){
            console.log('Enter is pressed');
            setIsEditing(!isEditing);
        }
    }
    const isComplete = () => {
        setCompleted(!completed);
        console.log({ completed })
    }
    let viewMode = {};
    let editMode = {};

    if (isEditing) {
        viewMode.display = "none"
    } else {
        editMode.display = "none"
    }


    return (
        <div >
            <li className="w-3/4 mx-auto flex flex-col bg-slate-50 p-3 m-3 rounded-xl">
                <div className="flex justify-start items-center pb-3">
                    <button type="button" className={"min-w-[1rem] w-4 h-4 rounded-full border border-black" + (completed ? ' bg-yellow-800': '')} onClick={isComplete}></button>
                    <textarea
                        type="text"
                        className="bg-slate-50 border-black border px-2 text-lg ml-3 flex flex-wrap w-full overflowAny rounded-lg"
                        value={value}
                        style={editMode}
                        onChange={(e) => setUpdate(e.target.value, id)}
                        onKeyDown={onPressEnter}
                    />
                    <p className={"px-2 text-lg flex flex-wrap ml-1 overflowAny text-justify" + (completed ? " line-through" : " ")} style={viewMode}>{value}</p>
                </div>
                <div className="flex justify-between items-center ml-7">
                    {!isEditing && <button className="bg-green-500 text-white rounded-md py-1 px-3 mr-2" onClick={editTodo}>Edit</button>}
                    {isEditing && <button className="bg-green-500 text-white rounded-md py-1 px-3 mr-2" onClick={editTodo}>Done</button>}
                    
                    <button className="bg-red-500 text-white py-1 px-3 mx-2 rounded-md" onClick={deleteTodo}>Delete</button>
                </div>
            </li>
        </div>
    )
}

export default Todo
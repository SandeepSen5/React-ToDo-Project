import React, { useEffect, useRef, useState } from 'react';
import '../Components/Todo.css';
import { AiFillDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineDone } from 'react-icons/md';

function Todo() {
    const [toDo, setTodo] = useState('')
    const [toDos, setTodos] = useState([])
    const [editId, setEditId] = useState(0)

    const addTodo = () => {
        if (toDo !== '') {
            setTodos([...toDos, { list: toDo, id: Date.now(), status: false }])
            console.log(toDos)
            setTodo('')
        }
        if (editId) {
            const editTodo = toDos.find((todo) => todo.id == editId)
            const updateTodo = toDos.map((to) => (to.id == editTodo.id) ?
                (to = { id: to.id, list: toDo, status: to.status })
                : (to = { id: to.id, list: to.list, status: to.status }))
            setTodos(updateTodo)
            setEditId(0)
            setTodo('')
        }
    }

    const inputRef = useRef('null')
    useEffect(() => {
        inputRef.current.focus()
    },)

    const onComplete = (id) => {
        const complete = toDos.map((list) => {
            if (list.id === id) {
                return ({ ...list, status: !list.status })
            }
            return list
        })
        setTodos(complete)
    }

    const onEdit = (id) => {
        const editTOdo = toDos.find((to) =>
            (to.id == id))
        setTodo(editTOdo.list)
        setEditId(editTOdo.id)
    }


    const onDelete = (id) => {
        setTodos(toDos.filter((to) => to.id !== id))
    }

    return (
        <div className="app">
            <div className="mainHeading">
                <h1>ToDo List</h1>
            </div>
            <div className="subHeading">
                <br />
            </div>
            <div className="input">
                <input type="text" value={toDo} ref={inputRef} onChange={(event) => { setTodo(event.target.value) }} placeholder="🖊️ Add item..." />
                <i class="fa-solid fa-circle-plus" onClick={addTodo}></i>
            </div>
            {toDos.map((to) => {
                return (
                    <div className="todos">
                        {
                            <div className="todo">
                                <div className="left">
                                    <p id={to.status ? 'listline' : ' '}>{to.list}</p>
                                </div>
                                <div className="right">
                                    <MdOutlineDone id='complete' onClick={() => onComplete(to.id)} title='Complete' />
                                    <FiEdit id='edit' onClick={() => onEdit(to.id)} title='Edit' />
                                    <AiFillDelete id='delete' onClick={() => onDelete(to.id)} title='Delete' />
                                </div>
                            </div>
                        }
                    </div>)
            })}
        </div>
    );
}


export default Todo;







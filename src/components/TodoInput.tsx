import React from 'react'

const TodoInput = () => {
  return (
    <div className='flex items-center gap-3'>
        <input className='bg-white rounded-md py-2.5 w-150 outline-0 placeholder:text-black text-black px-3 font-medium'/>
        <button className='py-2.5 bg-violet-600 px-3 rounded-md font-medium '>Add Task</button>
    </div>
  )
}

export default TodoInput
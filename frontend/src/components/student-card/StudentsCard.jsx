import React from 'react'
import './StudentCard.css'

const StudentsCard = ({ student }) => {
  return (
    <div className='card w-96 bg-base-100 shadow-xl border-solid divide-white > * + *'>
      <div className="card-body">
        <h2 className="card-title">{student.name}</h2>
        <p>{student._id}</p>
        <p>{student.tuition}</p>
        <p>{student.email}</p>
      </div>
    </div>
  )
}

export default StudentsCard
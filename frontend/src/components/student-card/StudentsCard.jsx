import React from 'react'
import './StudentCard.css'

const StudentsCard = ({ student }) => {
  return (
    <div className='student-card'>
        <h3>{student.name}</h3>
        <p style={{fontSize: '.8em'}}><i>{student._id}</i></p>
        <p>{student.tuition}</p>
        <p>{student.email}</p>
    </div>
  )
}

export default StudentsCard
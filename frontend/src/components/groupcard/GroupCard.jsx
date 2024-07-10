import React from 'react'

const GroupCard = ({ group }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body items-center text-center">
            <h2 className="card-title">{group.nome}</h2>
            <textarea 
                className='textarea textarea-bordered h-48' 
                readOnly value={group.descricao} 
                style={{ resize: 'none'}} 
            />
            <p>Turma: {group.turma}</p>
            <div className="card-actions">
            <button className="btn btn-primary">Buy Now</button>
            </div>
        </div>
    </div>
  )
}

export default GroupCard
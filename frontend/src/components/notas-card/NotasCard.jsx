import React from 'react'

const NotasCard = ({ atividade }) => {
  return (
    <div className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">{atividade.nome}</div>
        <div className="collapse-content">
            <p>{atividade.enunciado}</p>
        </div>
    </div>
  )
}

export default NotasCard
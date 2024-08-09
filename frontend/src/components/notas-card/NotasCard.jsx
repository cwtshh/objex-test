import React from 'react'

const NotasCard = ({ atividade }) => {
  return (
    <div className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">{atividade.nome}</div>
        <div className="collapse-content">
            <p>{atividade.timestamps}</p>
            <p>{atividade.enunciado}</p>
            {atividade.nota ? (
              <p></p>
            ) : (
                <div className='badge badge-error mt-6 p-4'>Ainda não há notas registradas</div>
            )}
        </div>
    </div>
  )
}

export default NotasCard
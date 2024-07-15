import React from 'react'

const AtividadeCard = ({ props }) => {

    const date = new Date(props.dataEntrega);
    const data = date.getDate();

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body items-center text-center">
            <h2 className="card-title">{props.nome}</h2>
            <div className='flex'>
                <p>Entrega: {new Date(props.dataEntrega).toString().split('21')[0]}</p>
            </div>
            <textarea 
                className="textarea textarea-bordered h-40 w-72" 
                placeholder="Type here" 
                value={props.enunciado} 
                readOnly
                style={{resize: 'none'}}
            ></textarea>
            <div className="card-actions">
                <button className="btn btn-primary">Editar</button>
                <button className="btn btn-outline">Excluir</button>
            </div>

            <button className='btn btn-info'>Ver Respostas</button>
        </div>
    </div>
  )
}

export default AtividadeCard
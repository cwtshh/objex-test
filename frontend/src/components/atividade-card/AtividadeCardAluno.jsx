import React from 'react'
import { useNavigate } from 'react-router-dom'

const AtividadeCardAluno = ({ props }) => {
    const navigate = useNavigate();
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
                <button onClick={() => navigate(`/aluno/atividade/${props._id}`)} className="btn btn-primary">Responder</button>
            </div>
        </div>
    </div>
  )
}

export default AtividadeCardAluno
import React from 'react'
import './ImageCard.css'

const ImageCard = ({ image }) => {
  return (

    <div className="card w-96 bg-base-100 shadow-xl">
      {/* <div className='img-card'>
      <img src={image.download_url} alt={image.file_name} />
        
        <div className='img-desc'>
            <p><b>Nome do arquivo: </b>{image.file_name}</p>
            <p><b>_id do arquivo: </b>{image._id}</p>
            <p><b>_id do estudante: </b>{image.student_id}</p>
        </div>
    </div> */}
    <figure className="px-10 pt-10"><img className="rounded-xl" src={image.download_url} alt={image.file_name} /></figure>
    <div className="card-body">
      <h2 className="card-title">{image.file_name}</h2>
      <p>_id: {image._id}</p>
      <p>estudante: {image.student_id}</p>

    </div>
  </div>
      
    
  )
}

export default ImageCard
import React from 'react'
import './ImageCard.css'

const ImageCard = ({ image }) => {
  return (
    <div className='img-card'>
      <img src={image.download_url} alt={image.file_name} />
        {/* <img src={image.download_url} alt={image.file_name} />
        <div className='img-desc'>
            <p>{image.file_name}</p>
            <p>{image._id}</p>
            <p>{image.student_id}</p>
        </div> */}
        <div className='img-desc'>
            <p><b>Nome do arquivo: </b>{image.file_name}</p>
            <p><b>_id do arquivo: </b>{image._id}</p>
            <p><b>_id do estudante: </b>{image.student_id}</p>
        </div>
    </div>
  )
}

export default ImageCard
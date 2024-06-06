import React, { useEffect, useState } from 'react'
import './ImgPage.css'
import axios from 'axios'
import '../../config/Routes'
import { API_BASE_URL } from '../../config/Routes'
import ImageCard from '../../components/image-card/ImageCard'

const ImgPage = () => {

  const [ images, setImages ] = useState([]);
  const get_all_images = async() => {
    try {
      const response = await axios.get(`${API_BASE_URL}/image/get-all`);
      setImages(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    get_all_images(); 
  }, []);
  return (
    <div className='img-page'>
        <h1>Upload de imagens</h1>
        <p>Este modulo permite o upload de images que serão armazenadas no serviço
            Firestorage da Google. Lembre-se se de configurar adequadamente a Service Account
            no backend para ter acesso a este serviço. Serão 4gb de armazenamento dedicado exclusivamente
            a imagens.
        </p>
        <h2 className='bad'>Upload - apenas pelo postman</h2>
        <form>
            <input type='file' name='image' accept='image/*' />
            <button>Enviar</button>
        </form>
        <h2>Consultar imagem</h2>
        <p className='bad'>Não implementado</p>

        <h3>Imagens cadastradas</h3>
        <div className='img-list'>
          {images.length > 0 ? (
            images.map((image, index) => {
              return (
                <div key={index} className='img-card'>
                  {/* <img src={image.download_url} alt={image.file_name} />
                  <p>{image.file_name}</p>
                  <p>Uploaded by: {image.student_id}</p> */}

                  <ImageCard key={index} image={image} />
                </div>
              )
            })
          ) : (
            <p className='bad'>Não há imagens cadastradas</p>
          )}
        </div>
    </div>
  )
}

export default ImgPage
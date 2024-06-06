import React from 'react'
import './ImgPage.css'

const ImgPage = () => {
  return (
    <div className='img-page'>
        <h1>Upload de imagens</h1>
        <p>Este modulo permite o upload de images que serão armazenadas no serviço
            Firestorage da Google. Lembre-se se de configurar adequadamente a Service Account
            no backend para ter acesso a este serviço. Serão 4gb de armazenamento dedicado exclusivamente
            a imagens.
        </p>
        <h2>Upload</h2>
        <form>
            <input type='file' name='image' accept='image/*' />
            <button>Enviar</button>
        </form>
        <h2>Consultar imagem</h2>
        <p className='bad'>Não implementado</p>
    </div>
  )
}

export default ImgPage
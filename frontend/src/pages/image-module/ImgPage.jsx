import React, { useEffect, useState } from 'react'
import './ImgPage.css'
import axios from 'axios'
import '../../config/Routes'
import { API_BASE_URL } from '../../config/Routes'
import ImageCard from '../../components/image-card/ImageCard'

const ImgPage = () => {

  const [ images, setImages ] = useState([]);
  const [ students, setStudents ] = useState([]);
  const [ student_id, setStudentId ] = useState('');
  const [ file, setFile ] = useState(null);
  const [ image_id, setImageId ] = useState('');
  const get_all_images = async() => {
    try {
      const response = await axios.get(`${API_BASE_URL}/image/get-all`);
      setImages(response.data);
      /* console.log(response.data); */
    } catch (err) {
      console.log(err);
    }
  };
  const get_all_users = async() => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students/get`);
      setStudents(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append('image', file);
    formData.append('student_id', student_id);

    try {
      const response = await axios.post(`${API_BASE_URL}/image/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteImage = async(e) => {
    /* e.preventDefault(); */
    try {
      const response = await axios.delete(`${API_BASE_URL}/image/delete`, {
        data: {
          id: image_id
        }
      })
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    get_all_images(); 
    get_all_users();
  }, []);
  return (
    <div className='img-page'>
        <h1>Upload de imagens</h1>
        <p>Este modulo permite o upload de images que serão armazenadas no serviço
            Firestorage da Google. Lembre-se se de configurar adequadamente a Service Account
            no backend para ter acesso a este serviço. Serão 4gb de armazenamento dedicado exclusivamente
            a imagens.
        </p>
        <h2>Upload</h2>
        <form onSubmit={handleSubmit}>
          <input type='file' name='image' accept='image/*' onChange={handleFileChange} />
          <div className='radio-buttons'>
                    {students.length > 0 ? (
                        students.map((student, index) => {
                            return (
                                <>
                                    <input 
                                        type='radio' 
                                        key={index} 
                                        value={student._id} 
                                        name='student'
                                        onChange={e => setStudentId(e.target.value)}
                                    /> <p>{student.name}</p>
                                </>
                            )
                        })
                    ) : (
                        <>
                            <h3 className='bad'>Não há estudantes cadastrados!</h3>
                            <button>Cadastrar estudantes</button>
                        </>
                    )}
                </div>
                <button>Enviar</button>
        </form>
        <h2>Baixar imagens</h2>
        <p className='bad'>Não implementado</p>

        <h3>Imagens cadastradas</h3>
        <div className='img-list'>
          {images.length > 0 ? (
            images.map((image, index) => {
              return (
                <ImageCard key={index} image={image} />
              )
            })
          ) : (
            <p className='bad'>Não há imagens cadastradas</p>
          )}
        </div>

        <h3>Deletar imagens</h3>
        
        <form onSubmit={handleDeleteImage}>
          <label>Id da imagem</label>
          <input type='text' placeholder='Digite o id da imagem' onChange={e => setImageId(e.target.value)} />
          <button type='submit'>Deletar</button>
        </form>
    </div>
  )
}

export default ImgPage
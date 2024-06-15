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
  const [ loading, setLoading ] = useState(true);

  const get_all_images = async() => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/image/get-all`);
      setImages(response.data);
      setLoading(false);
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
      /* console.log(response.data); */
      get_all_images();
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
          <input 
            type="file" 
            className="file-input file-input-bordered w-full max-w-xs"
            name="image"
            accept="image/*"
            onChange={handleFileChange}  
          />
          {/* <input type='file' name='image' accept='image/*' onChange={handleFileChange} /> */}
          <h2>Escolha o aluno</h2>
          <div>
              {students.length > 0 ? (
                students.map((student, index) => {
                  return (
                    <>

                      <div key={index} class="form-control">
                        <label class="label cursor-pointer">
                          <span class="label-text">{student.name}</span> 
                            <input 
                              type="radio" 
                              name="studnet" 
                              class="radio checked:bg-red-500"
                              value={student._id}
                              onChange={e => setStudentId(e.target.value)}
                            />
                          </label>
                      </div>
                    </>
                    )
                        })
                    ) : (
                      <>
                        <h3 className='bad'>Não há estudantes cadastrados!</h3>
                        <button type='submit' className='btn'>Cadastrar estudantes</button>
                      </>
          )}
          </div>
          <button type='submit' className='btn'>Enviar</button>
        </form>
        <h2>Baixar imagens</h2>
        {images.map((image, index) => {
          return (
            <button key={index} className='btn mr-2' >
              <a  download={image.download_url}>{image.file_name}</a>
            </button>
          )
        })}
        <p className='bad'>Não implementado</p>

        <h2>Imagens cadastradas</h2>
        <div className='img-list'>
          {!loading && images.length > 0 ? (
            images.length > 0 ? (
              images.map((image, index) => {
                return (
                  <ImageCard key={index} image={image} />
                )
              })
            ) : (
              <p className='bad'>Não há imagens cadastradas</p>
            )
          ) : (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          {/* {images.length > 0 ? (
            images.map((image, index) => {
              return (
                <ImageCard key={index} image={image} />
              )
            })
          ) : (
            <p className='bad'>Não há imagens cadastradas</p>
          )} */}
        </div>

        <h2>Deletar imagem</h2>
        
        <form onSubmit={handleDeleteImage}>
          {/* <label>Id da imagem</label>
          <input type='text' placeholder='Digite o id da imagem' onChange={e => setImageId(e.target.value)} />
          <button type='submit'>Deletar</button> */}
          <input 
            type="text" 
            placeholder="Digite a id da imagem a ser deletada" 
            className="input input-bordered w-full max-w-xs"
            onChange={e => setImageId(e.target.value)}
            style={{ marginRight: '10px'}}
          />
          <button type='submit' className='btn'>Deletar</button>
        </form>


    </div>
  )
}

export default ImgPage
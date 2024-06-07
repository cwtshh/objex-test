
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='welcome'>
        <h1>Bem vindo ao ObjeX-TESTES</h1>
        <p>O ObjeX é uma plataforma web de aprendizado gamificado projetada para promover a interatividade e o engajamento dos alunos. 
            Os professores podem criar e gerenciar missões educacionais, oferecendo desafios específicos para os estudantes aprimorarem seus conhecimentos. 
            A plataforma facilita a formação de grupos para colaboração em tarefas e permite o compartilhamento de trabalhos finais entre os alunos, promovendo uma aprendizagem mais colaborativa e envolvente. 
            É uma ferramenta inovadora que visa tornar o processo de aprendizagem mais dinâmico e eficaz.
        </p>
        <p><strong>!ATENÇÃO!</strong><i> SITE EM TESTES</i></p>
        
        <h2>Consultar módulos:</h2>
        <div className='module-div'>
          <button onClick={() => navigate('/groups')}>Grupos</button>
          <button onClick={() => navigate('/students')}>Alunos (login e registro)</button>
          <button onClick={() => navigate('/image')}>Envio de arquivos (imagens)</button>
          <button onClick={() => navigate('/code')}>Envio e execução de código</button>
        </div>

        <h2>Status de desenvolvimento de cada módulo:</h2>
        <div className='module-status'>
         <div>
            <h3>Grupos</h3>
            <ul>
              <li className='good'>Adicionar grupos</li>
              <li className='good'>Consultar grupos</li>
              <li className='good'>Adicionar alunos</li>
              <li className='good'>Remover alunos</li>
            </ul>
          </div>
          <div>
            <h3>Alunos</h3>
            <ul>
              <li className='good'>Registro de alunos</li>
              <li className='mid'>Login de alunos (sem jwt)</li>
              <li className='good'>Consultar alunos</li>
              <li className='bad'>Remover alunos</li>
            </ul>
          </div>
          <div>
            <h3>Envio de arquivos</h3>
            <ul>
              <li className='good'>Envio de imagens</li>
              <li className='good'>Consultar imagens</li>
              <li className='good'>Remover imagens</li>
            </ul>
          </div>
          <div>
            <h3>Envio e execução de código</h3>
            <ul>
              <li className='good'>Envio de código</li>
              <li className='mid'>Execução de código</li>
            </ul>
         </div>
        </div>
    </div>
  )
}

export default Home
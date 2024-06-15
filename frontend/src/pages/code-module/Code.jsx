import React, { useEffect, useState } from 'react'
import './Code.css'
import axios from 'axios'
import '../../config/Routes'
import { API_BASE_URL } from '../../config/Routes'

const Code = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('')

  const handleCodeInterpreter = async(e) => {
    e.preventDefault();
    try {
      console.log(code)
      const response = await axios.post(`${API_BASE_URL}/code/run`, {
        code: code
      });
      /* console.log(response.data) */
      setOutput(response.data.message)
    } catch (err) {
      setOutput(err.response.data.message)
    }
  };

  const handleKeyDown = (e) => {
    if(e.key === 'Tab') { 
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      console.log(start, end)
      setCode(code.substring(0, start) + '\t' + code.substring(end));

      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 1;
      }, 0);
    }
  };

  return (
    <div className='code-page'>
        <h1>Modulo de codigos</h1>
        <p>Este modulo permite o envio de codigos e execução dos mesmos dentro da própria API.</p>
        <h2 className='bad'>Envio do caso de teste referente a determinado Exercicio</h2>
        <form>
            
            <button>Enviar</button>
        </form>

        <h2 className='bad'>Envio de código - Com execução</h2>
        <form>
          <input
            type='file'
            className='file-input file-input-bordered w-full max-w-xs'
          />
          <button className='btn'>Enviar</button>
        </form>

        <h2>Interpretador no site</h2>
        <form onSubmit={handleCodeInterpreter}>
          <textarea
            className='textarea textarea-bordered h-24'
            placeholder='Digite seu código aqui...'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            rows='10'
            cols='50'
            style={{ resize: 'none', width: '100%', height: '100%', fontSize: '1.5rem'}}
          />
          <button type='submit' className='btn'>Run</button>
        </form>

        <h2>Output</h2>
        <textarea
          value={output.slice(8)}
          className='textarea textarea-primary textarea-bordered h-40'
          readOnly
          style={{ resize: 'none', width: '100%', fontSize: '1em'}}
        />

        {/* <textarea value={output} className='interpreter-output' readOnly /> */}
    </div>
  )
}

export default Code
import React, { useState } from 'react'
import ExcelJS from 'exceljs';
import axiosInstance from '../../axios/AxiosInstance';
import { useAuth } from '../../context/AuthContext';


const FileUpload = () => {
    const [ file, setFile ] = useState(null);
    const { user } = useAuth();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async() => {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file);
        const worksheet = workbook.worksheets[0];

        const students = [];
        worksheet.eachRow((row, rowNumber) => {
            const email_fix = row.getCell(3).value;
            if(rowNumber > 1) {
                students.push({
                    matricula: row.getCell(1).value,
                    nome: row.getCell(2).value,
                    email: email_fix.hyperlink ? email_fix.text : email_fix.valueOf()
                });
            }
        });
        // console.log(professor)
        await axiosInstance.post('/professor/create/alunos', { alunos: students, turma: professor.turma }).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <div>
            <label className="form-control w-full max-w-xs mt-6">
                <div className="label">
                    <span className="label-text">Selecione um arquivo:</span>
                </div>
                <input 
                    type="file" 
                    className="file-input file-input-bordered w-full max-w-xs"
                    onChange={handleFileChange}     
                />
            </label>

            <button onClick={() => handleUpload()} className='btn btn-primary mt-6'>Cadastrar Estudantes</button>
        </div>
    )
}

export default FileUpload;
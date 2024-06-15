import React, { useEffect, useState } from 'react';
import './GroupCard.css';
import Groups from '../../pages/group-module/Groups';
import axios from 'axios';
import '../../config/Routes'
import { API_BASE_URL } from '../../config/Routes';

const GroupCard = ({ group }) => {
    const [ students, setStudents ] = useState([]);
    
    const get_student_name = async(id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/students/get/${id}`);
            /* console.log(response.data); */
            return response.data;
            
        } catch (error) {
            console.log(error);
        }
    };

    const get_all_students = async() => {
        for (let i = 0; i < group.members.length; i++) {
            const student = await get_student_name(group.members[i]);
            setStudents([...students, student]);
        }
    };

    useEffect(() => {
        get_all_students();
    }, []);
    
    return (

    <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="card-title">{group.name}</h2>
            <div className='overflow-y-scroll h-64'>
                <p>{group.description}</p>
            </div>

            <div className='overflow-y-scroll h-40'>

                {group.members.length > 0 ? (
                    students.map((student, index) => {
                        return (
                            <p key={index}>{students[index].name}</p>
                        )
                    })
                ) : (
                    <p>Não há integrantes neste grupo.</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default GroupCard
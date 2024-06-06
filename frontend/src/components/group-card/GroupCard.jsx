import React, { useEffect, useState } from 'react';
import './GroupCard.css';
import Groups from '../../pages/group-module/Groups';
import axios from 'axios';
import '../../config/Routes'
import { API_BASE_URL } from '../../config/Routes';

const GroupCard = ({ group }) => {
    const get_student_name = async(id) => {
        const student = await axios.get(`${API_BASE_URL}/students/get/${id}`);
        return student.data;
    };

    const [ students, setStudents ] = useState([]);

    /* useEffect(() => {
        group.members.map(async(member, index) => {
            const student = await get_student_name(member);
            students.push(student);
        });
        console.log(students);
    }, []) */

    
    return (
        <div className='card'>
            <h3 style={{overflow: "hidden", width: '10em'}}>{group.name}</h3>
            <p className='desc'>{group.description}</p>
            <p>Integrantes:</p>
            <div className='members-div'>
                {group.members.length > 0 ? (
                    group.members.map((member, index) => {
                        return (
                            <p key={index}>{}</p>
                        )
                    })
                ) : (
                    <p className='bad'>Não há integrantes cadastrados</p>
                )}
            </div>
        </div>
  )
}

export default GroupCard
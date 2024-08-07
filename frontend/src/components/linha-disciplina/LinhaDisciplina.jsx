import React from 'react'
import EventCard from './EventCard';

const LinhaDisciplina = () => {

    const today = new Date();

    const eventos = [
        {
            data: '10/04/2025',
            descricao: 'Início das Aulas'
        },
        {
            data: '12/04/2025',
            descricao: 'Apresentação'
        },
        {
            data: '16/04/2025',
            descricao: 'Coneitos'
        },
        {
            data: '16/04/2025',
            descricao: 'Trabalho 1'
        },
        {
            data: '16/04/2025',
            descricao: 'Trabalho 2'
        },
        {
            data: '16/04/2025',
            descricao: 'Prova'
        }
        
    ]

    return (
        <div>
            {/* <ul className="timeline">
                <li>
                    <div className="timeline-start">10/04/2025</div>
                    <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd" />
                    </svg>
                    </div>
                    <div className="timeline-end timeline-box">Início das Aulas</div>
                    <hr />
                </li>
                <li>
                    <hr />
                    <div className="timeline-start">12/04/2025</div>
                    <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd" />
                    </svg>
                    </div>
                    <div className="timeline-end timeline-box">Apresentação</div>
                    <hr />
                </li>
                <li>
                    <hr />
                    <div className="timeline-start">16/04/2025</div>
                    <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd" />
                    </svg>
                    </div>
                    <div className="timeline-end timeline-box">Coneitos</div>
                    <hr />
                </li>
                <li>
                    <hr />
                    <div className="timeline-start">16/04/2025</div>
                    <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd" />
                    </svg>
                    </div>
                    <div className="timeline-end timeline-box">Trabalho 1</div>
                    <hr />
                </li>
                <li>
                    <hr />
                    <div className="timeline-start">16/04/2025</div>
                    <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd" />
                    </svg>
                    </div>
                    <div className="timeline-end timeline-box">Trabalho 2</div>
                </li>

                <li>
                    <hr />
                    <div className="timeline-start">16/04/2025</div>
                    <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd" />
                    </svg>
                    </div>
                    <div className="timeline-end timeline-box">Prova</div>
                </li>
            </ul> */}

            <ul className='timeline'>
                {eventos.map((evento, index) => {
                    return (
                        <EventCard key={index} index={index} evento={evento} />
                    )
                })}
            </ul>
        </div>
    )
}

export default LinhaDisciplina
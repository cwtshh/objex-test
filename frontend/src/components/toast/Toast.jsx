import React, { useEffect } from 'react'

const Toast = ({ type, message, duration = 3000, onClose, show }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => {
                clearTimeout(timer);
            };
        }
    })
  
    return (
    <div className={`toast toast-center transition-opacity duration-500 ease-in-out ${show ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`alert alert-${type}`}>
            <span>{message}</span>
        </div>
    </div>
  )
}

export default Toast
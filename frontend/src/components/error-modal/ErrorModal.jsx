import React from 'react'

const ErrorModal = ({error, message}) => {
  return (
    <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg error">{error}</h3>
            <p className="py-4">{message}</p>
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-error">Close</button>
            </form>
            </div>
        </div>
    </dialog>
  )
}

export default ErrorModal
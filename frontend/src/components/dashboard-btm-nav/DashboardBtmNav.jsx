import React from 'react'
import { Link } from 'react-router-dom'

const DashboardBtmNav = () => {
  return (
    
    <div className="drawer lg:drawer-open mb-6">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex ">
            {/* Page content here */}
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            </label>
        </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
            </ul>
        </div>
    </div>
  )
}

export default DashboardBtmNav
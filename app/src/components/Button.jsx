import React, { Children } from 'react'


import { Link } from 'react-router-dom';

const Button = ({styles, text, to}) => {
  return (
    <Link to={to}>
      <button type="button" className={`flex items-center justify-center h-[70px] w-[400px] bg-button font-inter font-medium text-[36px] text-white outline-none ${styles} rounded-[10px]`}>
        <span className=''>{text}</span>
      </button>
    </Link>
  )
}

export default Button
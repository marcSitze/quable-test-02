import React from 'react'
import './style.css'
import SpinnerGif from '../../assets/loader.gif';

const Spinner = () => {
  return (
    <div className='spinner'>
      <img width={100} height={100} src={SpinnerGif} alt="loader spinner" />
    </div>
  )
}

export default Spinner
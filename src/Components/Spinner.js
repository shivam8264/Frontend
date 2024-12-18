import React from 'react'
import loading from './Spinner-2.gif'

const Spinner = () => {
  return (
    <div className='container text-center' >
      <img className="my-3" style={{ mixBlendMode: 'multiply' }} src={loading} alt='loading' />
    </div>
  )
}

export default Spinner
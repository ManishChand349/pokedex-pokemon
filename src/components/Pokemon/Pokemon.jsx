import React from 'react'
import './Pokemon.css'
import { Link } from 'react-router-dom'

function Pokemon({name, image,id}) {
  return (
    <div className='pokemon'>
     <div className='pokemon-name'>{name}</div>
    <Link to={`/pokemon/${id}`}>

     <div><img className='pokemon-img' src={image} alt="" /></div>
    </Link>
    </div>
  )
}

export default Pokemon
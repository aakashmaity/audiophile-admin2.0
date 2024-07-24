import Image from 'next/image'
import React from 'react'

const ImageProduct = ({link}) => {
  return (
    <div key={link}>
        <Image src={link} alt={link} height={300} width={300} />
    </div>
  )
}

export default ImageProduct
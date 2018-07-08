import React from 'react'
import PropTypes from 'prop-types'

import NotAvailable from '../static/images/not-available.png'

const ShowItem = (props) => {
  const handleImageError = e => {
    e.target.src = NotAvailable
  }

  const {
    name,
    url,
    images
  } = props

  let filteredImages = images
    .filter(image => image.url.includes('CUSTOM'))
    .filter(image => image !== undefined)

  return (
    <li>
      <p>
        {name}
        <a 
          href={url}
          target="_blank"
        >
          Tickets
        </a>
      </p>
      <img 
        onError={handleImageError}
        src={filteredImages[0].url} 
      />
    </li>
  )
}

export default ShowItem

ShowItem.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  images: PropTypes.array,
}
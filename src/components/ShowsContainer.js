import React from 'react'
import ShowItem from './ShowItem'

const ShowsContainer = (props) => {
  let shows = props.shows._embedded ? props.shows._embedded.events.map(show => {
          return (
            <ShowItem 
              key={show.id}
              name={show.name}
              url={show.url}
              images={show.images}
            />
          )
        }) : ''
  return (
    <ul>
      {shows}
    </ul>
  )
}
export default ShowsContainer
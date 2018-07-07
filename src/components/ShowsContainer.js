import React from 'react'

const ShowsContainer = (props) => {
  let shows = props.shows._embedded ? props.shows._embedded.events.map(show => {
          return (
            <li
              key={show.id}
            >
              <p>{show.name}</p>
            </li>
          )
        }) : ''
  return (
    <ul>
      {shows}
    </ul>
  )
}
export default ShowsContainer
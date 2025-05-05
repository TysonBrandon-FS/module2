import React from 'react';

const ShowItem = ({ show }) => {
  return (
    <li>
      <strong>{show.showName}</strong> | Genre: {show.genre} | Year: {show.releaseYear}
      {show.network ? ` | Network: ${show.network.networkName}` : ''}
    </li>
  );
};

export default ShowItem; 
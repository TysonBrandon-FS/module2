import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowItem from './ShowItem';

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/shows');
        setShows(response.data.data);
      } catch (err) {
        console.error('Could not fetch shows.');
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  let content = null;
  if (loading) {
    content = <div>Loading...</div>;
  } else {
    if (shows.length === 0) {
      content = <div>No shows found.</div>;
    } else {
      content = (
        <ul className="show-list">
          {shows.map((show) => (
            <ShowItem key={show._id} show={show} />
          ))}
        </ul>
      );
    }
  }



  return (
    <div className="show-list-container">
      <h2>TV Shows</h2>
      {content}
    </div>
  );
};

export default ShowList; 
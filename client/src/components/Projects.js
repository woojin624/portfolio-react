import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    axios
      .get('/api/projectlist')
      .then((res) => {
        setProjectsList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div>{projectsList[0].title}</div>
    </>
  );
};

export default Projects;

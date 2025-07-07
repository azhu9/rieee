// import React from 'react';
import { useParams } from 'react-router-dom';

import DivBody from '../components/DivBody';
import NoPage from './NoPage'
import { divisionContent } from '../utils/divisionData';


const DivisionPage = () => {
  const { id } = useParams();
  const division = divisionContent[id];

  if (!division) {
    return (
      <>
        <NoPage/>
      </>
    );
  }
return (
    <>
      <DivBody
        title={division.title}
        carouselSlides={division.carouselSlides}
        description={division.description}
        meetingTime={division.meetingTime}
        meetingLocation={division.meetingLocation}
      />
    </>
  );
};

export default DivisionPage;
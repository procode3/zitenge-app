import Nav from './Nav';
import NavMobile from './NavMobile';
import Footer from './Footer';

import React from 'react';

function ExperienceLayout(children) {
  return (
    <>
      <Nav />
      <NavMobile />
      {children}
      <Footer />
    </>
  );
}

export default ExperienceLayout;

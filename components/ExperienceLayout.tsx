import Nav from './Nav';
import NavMobile from './NavMobile';
import Footer from './Footer';

import { ReactNode } from 'react';

function ExperienceLayout(children: ReactNode) {
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

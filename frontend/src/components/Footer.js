import React from 'react'
import './css/footer.css'
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {currentYear} Brand City. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';
const Footer: React.FC = () => {

return (
    <footer>
        <Link to="/">© 2022 Crow, Inc.</Link>
        <Link to="/about">About us</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms and conditions</Link>
    </footer>
);
}

export default Footer;
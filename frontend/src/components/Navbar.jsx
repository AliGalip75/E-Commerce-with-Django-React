import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gray-800 text-white p-4">
    <ul className="flex space-x-4">
      <li><Link to="/">Ana Sayfa</Link></li>
      <li><Link to="/cart">Sepet</Link></li>
      <li><Link to="/login">Giriş</Link></li>
    </ul>
  </nav>
);

export default Navbar;
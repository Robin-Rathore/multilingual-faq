import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, 
  PlusCircleIcon, 
  CogIcon, 
  LanguageIcon 
} from '@heroicons/react/24/solid';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">
          Multilingual FAQ
        </div>
        
        <div className="hidden md:flex space-x-4">
          <NavLink to="/" icon={<HomeIcon className="h-5 w-5" />} label="Dashboard" />
          <NavLink to="/create" icon={<PlusCircleIcon className="h-5 w-5" />} label="Create FAQ" />
          <NavLink to="/admin" icon={<CogIcon className="h-5 w-5" />} label="Admin" />
          <NavLink to="/languages" icon={<LanguageIcon className="h-5 w-5" />} label="Languages" />
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white">
          <MobileNavLinks />
        </div>
      )}
    </nav>
  );
}

const NavLink = ({ to, icon, label }) => (
  <Link 
    to={to} 
    className="flex items-center space-x-2 text-gray-700 hover:text-primary transition"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const MobileNavLinks = () => (
  <div className="px-4 pt-2 pb-4 space-y-2">
    <NavLink to="/" icon={<HomeIcon className="h-5 w-5" />} label="Dashboard" />
    <NavLink to="/create" icon={<PlusCircleIcon className="h-5 w-5" />} label="Create FAQ" />
    <NavLink to="/admin" icon={<CogIcon className="h-5 w-5" />} label="Admin" />
    <NavLink to="/languages" icon={<LanguageIcon className="h-5 w-5" />} label="Languages" />
  </div>
);

export default Navbar;
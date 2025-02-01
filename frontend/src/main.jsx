import React from "react"; // Correct import, use `React` with capital R
   import { createRoot } from 'react-dom/client';
   import './index.css';
   import App from './App.jsx';

   createRoot(document.getElementById('root')).render(
       <App />
   );

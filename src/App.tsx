import React from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/home';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Home />
      <Footer />
    </>
  );
}

export default App;

import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import HeaderBar from './comonents/ui/HeaderBar';
import MainSearch from './pages/search/MainSearch';
import theme from './theme';
import './App.css'
import { CssBaseline } from '@mui/material';
import UserInfoLayout from './pages/user-main/UserInfoLayout';
import Error from './pages/error/Error';

function App() {

  return (
    <React.Fragment>
      <BrowserRouter>
        <HeaderBar />
        <Routes>
          <Route path="/" element={<MainSearch />}></Route>
          <Route path="/user/:userId" element={<UserInfoLayout />}></Route>
          <Route path="/error" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  // </React.StrictMode>
);

export default App

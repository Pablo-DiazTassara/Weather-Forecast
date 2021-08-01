import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Footer from './footer';
import './layout.css'
import AppModal from './modal';
import {Spinner} from "../spinner/spinner";
import { useSelector } from 'react-redux';






const Layout = ({ children }) => {

    const loading = useSelector(state => state.spinner.loading);
    
    return (
      <React.Fragment>
        {loading ? <Spinner /> : null}        
        <Container >
          {children}
          <AppModal/>
        </Container>
        <Footer/>
      </React.Fragment>
    );
  }


export default Layout;

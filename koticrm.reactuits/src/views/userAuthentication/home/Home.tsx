import React from 'react'
import './home.scss'
import logo from './images/logo.png'
import { CCard, CCol, CRow } from '@coreui/react'
import mainImage from './images/first-fold.png'
import aboutImage from './images/about-image.png'
import accountsIcon from './images/accounts-icon.png'
import contactIcon from './images/contacts-icon.png'
import customIcon from './images/custom-icon.png'
import invoiceIcon from './images/invoice-icon.png'
import reportIcon from './images/report-icon.png'
import taskIcon from './images/task-icon.png'
import callIcon from './images/call-icon.png'
import emailIcon from './images/email-icon.png'

import locationIcon from './images/location-icon.png'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="logo" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Contact Us</a>
              </li>
            </ul>
            <div className='login-btn'>
              <a className='btn-theme' onClick={() => navigate('/login')}>Login</a>
            </div>
          </div>
        </div>
      </nav>

      {/* ---------------------first fold-------------------------- */}
      <section className='first-fold'>
        <div className='container'>
          <CRow className='align-items-center'>
            <CCol xl={6} lg={12}>
              <div className='content'>
                <h1>Optimizing Business Operations with CRM Data Management</h1>
                <p>“Empower your business with our intuitive CRM solutions. Streamline operations, boost efficiency, and delight customers."</p>
                <a className='btn-theme btn-border'>Get Started</a>
              </div>
            </CCol>
            <CCol xl={6} lg={12}>
              <div className='main-image'>
                <img src={mainImage} alt="kotiCRM" />
              </div>
            </CCol>
          </CRow>
        </div>
      </section>
      {/* ---------------------first fold-------------------------- */}

      {/* ---------------------About koticrm-------------------------- */}
      <section className='about-crm'>
        <div className='container'>
          <CRow className='align-items-center'>
            <CCol xl={6} lg={12} className='change-order'>
              <div className='about-image'>
                <img src={aboutImage} alt="kotiCRM" />
              </div>
            </CCol>
            <CCol xl={6} lg={12}>
              <div className='title-content'>
                <h2>About KotiCRM</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mollis odio non metus finibus pellentesque. Cras nec varius est. Nulla elit urna, bibendum eget tincidunt ac, eleifend in orci. Fusce ac interdum dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mollis odio non metus finibus pellentesque. Cras nec varius est. Nulla elit urna, bibendum eget tincidunt ac.</p>
                <a className='btn-theme'>Explore Now</a>
              </div>
            </CCol>
          </CRow>
        </div>
      </section>
      {/* ---------------------About koticrm-------------------------- */}

      {/* ---------------------features-------------------------- */}
      <section className='features'>
        <div className='container'>
          <CRow>
            <CCol xs={12}>
              <div className='title-content text-center'>
                <h2>Unleash Efficiency with KotiCRM’s Features</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mollis odio non metus finibus pellentesque. Cras nec varius est. Nulla elit urna, bibendum eget tincidunt ac, eleifend in orci. Fusce ac interdum dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
              </div>
            </CCol>
            <CCol xl={4} lg={6} md={12}>
              <CCard>
                <img src={accountsIcon} alt="kotiCRM" />
                <h3>Accounts Management</h3>
                <p>Provide tools for managing user accounts, including creating new accounts, updating existing ones, and viewing account details such as contact information, purchase history, and preferences.</p>
              </CCard>
            </CCol>
            <CCol xl={4} lg={6} md={12}>
              <CCard>
                <img src={contactIcon} alt="kotiCRM" />
                <h3>Contacts Management</h3>
                <p>Allow users to manage their contacts easily, including adding new contacts, organizing them into groups or categories, and tracking interactions and communication history with each contact.</p>
              </CCard>
            </CCol>
            <CCol xl={4} lg={6} md={12}>
              <CCard>
                <img src={invoiceIcon} alt="kotiCRM" />
                <h3>Invoicing</h3>
                <p>Offer invoicing capabilities to help users generate and send invoices to their clients directly from the CRM platform. This feature may include customizable invoice templates, tracking of invoice status and payments.</p>
              </CCard>
            </CCol>
            <CCol xl={4} lg={6} md={12}>
              <CCard>
                <img src={reportIcon} alt="kotiCRM" />
                <h3>Reporting and Analytics:</h3>
                <p>Include robust reporting and analytics tools that enable users to gain insights into their sales, marketing, and customer service activities. This could involve generating various types of reports, visualizing data with charts and graphs.</p>
              </CCard>
            </CCol>
            <CCol xl={4} lg={6} md={12}>
              <CCard>
                <img src={taskIcon} alt="kotiCRM" />
                <h3>Task Management</h3>
                <p>Provide tools for managing tasks, appointments, and other activities related to user interactions. Users should be able to schedule follow-ups, set reminders, and track the progress of their tasks and activities within the CRM platform.</p>
              </CCard>
            </CCol>
            <CCol xl={4} lg={6} md={12}>
              <CCard>
                <img src={customIcon} alt="kotiCRM" />
                <h3>Customization</h3>
                <p>Offer customization options that allow users to tailor the CRM platform to their specific needs. This could include customizable dashboards, fields, and workflows, as well as the ability to add custom fields to the interface.</p>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </section>
      {/* ---------------------features-------------------------- */}

      {/* ---------------------contact us-------------------------- */}
      <section className='contact'>
        <div className='container'>
          <CRow className='align-items-center'>
            <CCol xl={6} lg={6} md={12}>
              <div className='content'>
                <div className='title-content'>
                  <h2>Contact Us</h2>
                  <p>Lorem ipsum dolor sit amet consectetur. Eu quis enim tempor et proin neque.</p>
                </div>
                <div>
                  <div className='info-icon'>
                    <img src={callIcon}></img>
                    <span className='text'>+84 98798733</span>
                  </div>
                  <div className='info-icon'>
                    <img src={emailIcon}></img>
                    <span className='text'>support@koticrm.com</span>
                  </div>
                  <div className='info-icon'>
                    <img src={locationIcon}></img>
                    <span className='text'>+84 132, My Street, Kingston, New York 12401</span>
                  </div>
                </div>
              </div>
            </CCol>
            <CCol xl={6} lg={6} md={12}>
              <CCard>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your name'></input>
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your email'></input>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-control" rows={5} placeholder='Type here...'></textarea>
                </div>
                <a className='btn-theme'>Submit</a>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </section>
      {/* ---------------------contact us-------------------------- */}


      {/* ---------------------footer-------------------------- */}
      <footer>
        <p>Copyright © 2024 KotiCRM . All rights reserved.</p>
      </footer>
      {/* ---------------------footer-------------------------- */}
    </>
  )
}

export default Home
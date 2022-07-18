import React, { useEffect, useState } from 'react';

import { Tabs, Tab, Row, Col, Stack, Image, Form } from 'react-bootstrap';
import { ChevronRight, PlusLg } from 'react-bootstrap-icons';
import ReactSelect from 'react-select';

import './NavbarTabsStyles.scss';
import '../customStyles.scss';

import Sidebar from '../sidebar/Sidebar';
import EmptyDataImg from '../../empty_data_img.png';

const selectPeriod = [ 
  {
    value: "last30days",
    label: "Last 30 days"
  },
  {
    value: "last90days",
    label: "Last 90 days"
  },
  {
    value: "last365days",
    label: "Last 365 days"
  },
  {
    value: "fromJanuary2020",
    label: "From January 2020"
  },
  {
    value: "custom",
    label: (
      <div className="d-flex justify-content-between">
        <div>
          <span>Custom</span>
        </div>
        <div>
          <ChevronRight />
        </div>
      </div>
    )
  }
];

const fontStyles = {
  fontFamily: "'Open Sans', sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  fontStyle: "normal",
  lineHeight: "19px",
}

const NavbarTabs = () => {

  const [ categories, setCategories ] = useState([]);
  const [ messageText, setMessageText ] = useState("");
  const [ tabList, setTabList ] = useState([
    {
      key: "Dashboard",
      label: "Dashboard",
      isActive: true,
      tabContent: <div>This is the dashboard content</div>   
    }
  ]);

  useEffect(
    () => {
      setMessageText(categories.join(' and ').toLowerCase());
    }
  ,[categories]);
  
  const handlePeriodChange = (selected) => {
    console.log("select value ", selected);
  };

  const handleTabChange = (key) => {
    setTabList(
      tabList.map(
        (tab) => {
          return { ...tab, isActive : tab.key === key }
        }
      )
    )
  }
  
  const dashboardContent = () => {
    return (
      <>
        <div className="container-fluid g-sm-0">
          <Row className="g-0">
            <Col 
              className="mb-4 mb-sm-4 p-lg-2 p-sm-3"
              lg={ 9 }
              md={ 8 }
              xs={ 12 }>
              <div className="p-2">
                <p style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "18px",
                  lineHeight: "25px",
                  color: "#000000"
                }}>{ messageText }</p>
              </div>
            </Col>
            <Col 
              className="mb-4 mb-sm-4"
              lg={ 3 }
              md={ 4 }
              xs={ 12 }>
              <div className="pe-lg-3 pe-md-0">
                <Form.Label className="mb-0">Period: </Form.Label>
                <ReactSelect
                  options={ selectPeriod }
                  defaultValue={ selectPeriod[0] }
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      "&:hover": {
                        backgroundColor: "#D3ECFF"
                      },
                    }),
                    singleValue: (base) => ({
                      ...base,
                      ...fontStyles,
                      color: "#2D3436"
                    }),
                    option: (base, state) => ({
                      ...base,
                      ...fontStyles,
                      color: "#000000",
                      backgroundColor: state.isSelected ? "#72BBF4" : base.backgroundColor
                    }),
                    placeholder: (base) => ({
                      ...base,
                      ...fontStyles,
                      color: "#B2BEC3",
                    })
                  }}
                  onChange={ handlePeriodChange }
                  placeholder="Period: "
                />
              </div>
            </Col>
          </Row>
        </div>
        <Row className="g-0">
          <Col 
            id="sidebar-container"
            className="mb-sm-4 mb-4 mb-lg-0 vh-lg-100" 
            lg={ 3 }>
            <Sidebar
              setCategories={ setCategories }
              categories={ categories }
            />
          </Col>
          <Col className="mb-sm-4 mb-4" lg={ 9 }>
            <div className="px-lg-3">
              <Stack 
                className="d-flex justify-content-center align-items-center"
                style={{
                  height: "540px",
                  border: "1px solid #DFE6E9",
                  borderRadius: "4px"
                }}>
                <div
                  className="d-flex justify-content-center align-items-center ellipse-style-1">
                  <Image
                    src={ EmptyDataImg }
                    alt="empty-data-pic"
                    style={{
                      margin: "auto",
                      display: "block"
                    }}
                  />
                </div>
                <p 
                  className="mt-2 paragraph-style-1">
                  Select COVID-19 category to start
                </p>
              </Stack>
            </div>
          </Col>
        </Row>
      </>
    )
  }

  return (
    <div id="tabNavigation">
      <ul className="mb-3 nav nav-tabs"
        role="tablist">
        {
          tabList.map(
            (tabs) => {
              return (
                <li 
                  key={ tabs.key }
                  className="nav-item"
                  role="presentation"
                  onClick={ () => { 
                    handleTabChange(tabs.key) 
                    } 
                  }>
                  <button type="button"
                    id={ `tab-${ tabs.key }` }
                    className={ `nav-link ${ tabs.isActive ? `active`: `` }` }
                    role="tab">
                    { tabs.label }
                  </button>
                </li>
              )
            }
          )
        }
        <li className="nav-item"
          role="presentaion"
          onClick={ 
            () => {
              setTabList([ ...tabList, 
                {
                  key: `newTab${ tabList.length }`,
                  label: `New Tab ${ tabList.length }`,
                  isActive: false,
                  tabContent: (<div className="container-fluid g-sm-0">This is the new tab { tabList.length } tab.</div>),
                }
              ])
            } 
          }>
          <button type="button"
            className="nav-link"
            role="tab">
            <PlusLg />
          </button>
        </li>
      </ul>
      <div className="tab-content pt-3">
        {
          tabList.map(
            (tabs) => {
              return (
                <div key={ tabs.label }
                  role="tabpanel"
                  id={ `tabpane-${ tabs.key }` }
                  className={ `fade g-lg-0 tab-pane ${ tabs.isActive ? `active show`: ``}` }>
                  { tabs.tabContent }
                </div>
              )
            }
          )
        }
      </div>
    </div>
  );
}

export default NavbarTabs;

//{ 
//  category: 'cases', 
//  dataOrientation: dataOrientation, 
//  race: race
//  geography: geography
//}

/* 
  <div className="container-fluid g-sm-0">
                        <Row className="g-0">
                          <Col 
                            className="mb-4 mb-sm-4 p-lg-2 p-sm-3"
                            lg={ 9 }
                            md={ 8 }
                            xs={ 12 }>
                            <div className="p-2">
                              <p style={{
                                fontFamily: "'Open Sans', sans-serif",
                                fontWeight: 600,
                                fontSize: "18px",
                                lineHeight: "25px",
                                color: "#000000"
                              }}>{ messageText }</p>
                            </div>
                          </Col>
                          <Col 
                            className="mb-4 mb-sm-4"
                            lg={ 3 }
                            md={ 4 }
                            xs={ 12 }>
                            <div className="pe-lg-3 pe-md-0">
                              <Form.Label className="mb-0">Period: </Form.Label>
                              <ReactSelect
                                options={ selectPeriod }
                                defaultValue={ selectPeriod[0] }
                                styles={{
                                  control: (base, state) => ({
                                    ...base,
                                    "&:hover": {
                                      backgroundColor: "#D3ECFF"
                                    },
                                  }),
                                  singleValue: (base) => ({
                                    ...base,
                                    ...fontStyles,
                                    color: "#2D3436"
                                  }),
                                  option: (base, state) => ({
                                    ...base,
                                    ...fontStyles,
                                    color: "#000000",
                                    backgroundColor: state.isSelected ? "#72BBF4" : base.backgroundColor
                                  }),
                                  placeholder: (base) => ({
                                    ...base,
                                    ...fontStyles,
                                    color: "#B2BEC3",
                                  })
                                }}
                                onChange={ handlePeriodChange }
                                placeholder="Period: "
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <Row className="g-0">
                        <Col 
                          id="sidebar-container"
                          className="mb-sm-4 mb-4 mb-lg-0 vh-lg-100" 
                          lg={ 3 }>
                          <Sidebar
                            setCategories={ setCategories }
                            categories={ categories }
                          />
                        </Col>
                        <Col className="mb-sm-4 mb-4" lg={ 9 }>
                          <div className="px-lg-3">
                            <Stack 
                              className="d-flex justify-content-center align-items-center"
                              style={{
                                height: "540px",
                                border: "1px solid #DFE6E9",
                                borderRadius: "4px"
                              }}>
                              <div
                                className="d-flex justify-content-center align-items-center ellipse-style-1">
                                <Image
                                  src={ EmptyDataImg }
                                  alt="empty-data-pic"
                                  style={{
                                    margin: "auto",
                                    display: "block"
                                  }}
                                />
                              </div>
                              <p 
                                className="mt-2 paragraph-style-1">
                                Select COVID-19 category to start
                              </p>
                            </Stack>
                          </div>
                        </Col>
                      </Row>
                    </>
      }]);
*/


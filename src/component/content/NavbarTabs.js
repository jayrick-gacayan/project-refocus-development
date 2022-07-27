import React, { useState } from 'react';
import { PlusLg } from 'react-bootstrap-icons';

import NavbarTabsItem from './NavbarTabsItem';
import NavbarTabsPane from './NavbarTabsPane';

import './NavbarTabsStyles.scss';
import '../customStyles.scss';

const NavbarTabs = () => {

  const [ tabData, setTabData ] = useState([{
    tabKey: "Dashboard",
    dataPeriod: "",
    categories: []
  }]);

  const [ tabList, setTabList ] = useState([
    {
      key: "Dashboard",
      label: "Dashboard",
      tabIsActive: true
    }
  ]);
  
  const handleTabChange = (key) => {
    setTabList(
      tabList.map(
        (tab) => {
          return { ...tab, tabIsActive : tab.key === key }
        }
      )
    )
  }
  
  return (
    <div id="tabNavigation">
      <ul className="nav nav-tabs"
        role="tablist">
        {
          tabList.map(
            (tabs) => {
              const { key, tabIsActive, label } = tabs;
              
              return (
                <NavbarTabsItem key={ key }
                  tabIsActive={ tabIsActive }
                  label={ label } 
                  tabKey={ key } 
                  handleTabChange={ handleTabChange } />
              )
            }
          )
        }
        <li className="nav-item"
          role="presentaion"
          onClick={ 
            () => {
              const tabsLength = tabList.length;

              if(tabsLength < 3){
                setTabList([ ...tabList, 
                  {
                    key: `Dashboard-${ tabsLength }`,
                    label: `Dashboard ${ tabsLength }`,
                    tabIsActive: false
                  }
                ])

                setTabData([...tabData, 
                  {
                    tabKey: `Dashboard-${ tabsLength }`,
                    dataInfo: "",
                    dataPeriod: "",
                    categories: []
                  }
                ]);
              }
            }
          }>
          <button type="button"
            className="nav-link"
            disabled={ tabData.length === 3 }
            role="tab">
            <PlusLg className="icon-style-1" />
          </button>
        </li>
      </ul>
      <div className="tab-content">
        {
          tabList.map(
            (tabs, index) => {
              const { key, label, tabIsActive } = tabs;
              return (
                <NavbarTabsPane key={ label }
                  tabKey={ key }
                  tabIsActive={ tabIsActive } 
                  setTabData={ setTabData }
                  tabData={ tabData[index] }
                  tabDataAll={ tabData } />
              )
            }
          )
        }
      </div>
    </div>
  );
}

export default NavbarTabs;
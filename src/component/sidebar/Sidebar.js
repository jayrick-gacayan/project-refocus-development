import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import CollapseToggle from './CollapseToggle';
import CollapseContent from './CollapseContent';

import './SidebarStyle.scss';

const ListGroupOptions = [
  {
    key: "Cases",
    label: "Cases",
    borderLeftColor: "hotPink",
    showCollapse: false,
  },
  {
    key: "Deaths",
    label: "Deaths",
    borderLeftColor: "purple",
    showCollapse: false,
  },
  {
    key: "Tests",
    label: "Tests",
    borderLeftColor: "yellow",
    showCollapse: false
  },
  {
    key: "Vaccinations",
    label: "Vaccinations",
    borderLeftColor: "green-1",
    showCollapse: false
  },
  {
    key: "Police Shootings",
    label: "Police Shootings",
    borderLeftColor: "green-2",
    showCollapse: false
  },
  {
    key: "Population estimates",
    label: ( 
      <div className="d-inline-block">
        <span className="d-block">Population estimates</span>
        <span 
          className="d-block" 
          style={{
            fontSize: "14px"
          }}>( 1 year estimates )</span>
      </div>
    ),
    borderLeftColor: "orange",
    showCollapse: false
  }
];

const Sidebar = ({ setCategories, categories }) => {
  console.log("categories", categories);
  
  const [ listOptions, setListOptions ] = useState(ListGroupOptions);

  const handleCollapseToggle = (type) => {

    if((categories.length === 2 && categories.includes(type)) || 
      categories.length < 2){
      setListOptions(
        listOptions.map(
          (listItem) => {
            const showCollapse = !listItem.showCollapse;

            if(listItem.key === type)
            {
              setCategories(
                (categories) => {
                  return showCollapse ? 
                  [ ...categories, type ] :
                  categories.filter((category) => { return category !== type })
                }
                
              )
            
              return ({ ...listItem, showCollapse: !listItem.showCollapse })
            }
            
            return listItem;
          }
        )
      )
    }
    else alert("Over the limit");
  };
  
  return(
    <ListGroup
      id="sidebarNavigation">
      <ListGroup.Item 
        className="category-info-select-max-list-group-item">
        Select max. 2 categories
      </ListGroup.Item>
      {
        listOptions.map(
          (listGroupItem) => {
            return(
              <ListGroup.Item key={ listGroupItem.key }
                variant={ listGroupItem.showCollapse ? `light` : `secondary` }
                className={ `${ listGroupItem.showCollapse ? `border-left-${ listGroupItem.borderLeftColor }` : `` }` }>
                <CollapseToggle 
                  handleCollapseToggle={ handleCollapseToggle }
                  showCollapse={ listGroupItem.showCollapse }
                  type={ listGroupItem.key }
                  label={ listGroupItem.label }
                />
                <CollapseContent 
                  showCollapse={ listGroupItem.showCollapse }
                />
              </ListGroup.Item>
            )
          }
        )
      }
    </ListGroup>
  );
}

export default Sidebar;
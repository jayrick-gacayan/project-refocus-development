import React, { useEffect, useState } from 'react';
import { Form, Collapse } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';
import ReactSelect, { components, createFilter } from 'react-select';
import { XLg } from 'react-bootstrap-icons';

import { dataOrientationOption, raceOption, stateOptions } from '../../data';
import { fontStyles, customFontStyles } from '../customFontStyleHelper';

import '../customStyles.scss';
import '../../CustomVariables.scss';

const groupStateOptions = [
  {
    label: "United States",
    options: stateOptions
  }
]

const stateMenuListComponent = ({ selectProps, ...props }) => {
  const { onInputChange, stateInputValue, onMenuInputFocus } = selectProps;

  // Copied from source
  const ariaAttributes = {
    "aria-autocomplete": "list",
    "aria-label": selectProps["aria-label"],
    "aria-labelledby": selectProps["aria-labelledby"]
  };

  function focusAndStopProp(e){
    e.stopPropagation();
    e.target.focus();
  }

  return (
    <>
      <Form.Group className="px-2 py-1">
        <Form.Control type="text"
          id="state-search"
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
          value={ stateInputValue }
          onChange={(e) =>
            onInputChange(e.currentTarget.value, {
              action: "input-change"
            })
          }
          onMouseDown={(e) => { focusAndStopProp(e); }}
          onTouchEnd={(e) => { focusAndStopProp(e); }}
          onFocus={ onMenuInputFocus }
          placeholder="Search"
          { ...ariaAttributes } />
      </Form.Group>
      <components.MenuList { ...props } selectProps={ selectProps }>
        { props.children }
      </components.MenuList>
    </>
  )
}

const stateGroupHeadingComponent = (props) => {
  
  return(
    <>
      <components.GroupHeading { ...props }>
        <div className="d-flex justify-content-between align-items-center">
          <Form.Check>
            <Form.Check.Input
              id={ props.data.label }
              type="checkbox"
              onChange={ () => null }/>
            <Form.Check.Label
              htmlFor={ props.data.label }
              style={
                { ...customFontStyles({ ...fontStyles, color: "#000000" }) }
              }>{ props.children }
            </Form.Check.Label>
          </Form.Check>
        </div>
      </components.GroupHeading>
      <hr className="hr-style-1" />
    </>
  );
}
const stateOptionComponent = ({ selectProps, ...props }) => {
  const { stateInputValue } = selectProps;
  return (
    <div>
      <components.Option { ...props } selectProps={ selectProps }>
        <div className="d-flex justify-content-between align-items-center">
          <Form.Check>
            <Form.Check.Input
              id={ props.label }
              type="checkbox" 
              checked={ props.isSelected }
              onChange={ () => null }/>
            <Form.Check.Label
              htmlFor={ props.label }
              style={
                { ...customFontStyles({ ...fontStyles, color: "#000000" }) }
              }>{ 
                stateInputValue === "" 
                ? props.label : 
                ( 
                  <>
                    <strong 
                      style={{ 
                        ...customFontStyles({ ...fontStyles, fontWeight: 700 })
                      }}>{ (props.label).substr(0, stateInputValue.length) }</strong>
                    { (props.label).substr(stateInputValue.length) }
                  </>
                  
                )
              }
            </Form.Check.Label>
          </Form.Check>
        </div>
      </components.Option>
    </div>
  );
};

const stateValueContainerComponent = ({ children, selectProps, ...props }) => {
  return (
    <components.ValueContainer { ...props } selectProps={ selectProps }>
      { 
        React.Children.map(children, 
          (child, index) => {
            if(index <= 5)
              return child;
            
            return;
          }
        )
      }
    </components.ValueContainer>
  );
}

const stateDropdownIndicatorComponent = (props) => {
  const stateValues = props.selectProps.value;
  return(
    <div className="d-flex justify-content-between align-items-center flex-column align-self-stretch">
      <components.DropdownIndicator { ...props }/>
      {
        stateValues && stateValues.length > 6 ?
        (
          <div 
            style={{
              ...customFontStyles({
                ...fontStyles,
                fontSize: "10px",
                lineHeight: "14px",
                color: "#636E72"
              }),
              padding: "4px"
            }}>
            { `${ stateValues.length - 6 } +` }
          </div>
        ) : (<></>)
      }
    </div>
  );
}
const stateMultiValueRemoveComponent = (props) => {
  return(
    <components.MultiValueRemove { ...props }>
      <XLg className="remove-tag-icon-1" />
    </components.MultiValueRemove>
  );
}

const ReactSelectStyle1 = {
  control: (base) => ({
    ...base,
    "&:hover": {
      backgroundColor: "#D3ECFF"
    },
    minHeight: "30px"
  }),
  indicatorSeparator:(base) => ({
    ...base,
    width: 0
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0px 8px",
  }),
  singleValue: (base) => ({
    ...base,
    ...customFontStyles({ ...fontStyles, color: "#2D3436" })
  }),
  option: (base, state) => ({
    ...base,
    ...customFontStyles({ ...fontStyles, color: "#000000" }),
    backgroundColor: state.isSelected ? "#72BBF4" : base.backgroundColor,
    "&:hover": { 
      backgroundColor: state.isSelected ? "#086EBE" : base.backgroundColor,
      cursor: "pointer"                                    
    }
  }),
  placeholder: (base) => ({
    ...base,
    ...customFontStyles({ ...fontStyles, color: "#B2BEC3" })
  })
}


const PlaceHolderComponent = ({ selectProps, ...props}) => {
  const { placeholderContent } = selectProps;
  return (
    <components.Placeholder { ...props } selectProps={ selectProps }>
      { placeholderContent }
    </components.Placeholder>
  )
}

const CollapseContent = ({ showCollapse, type, handleDataOrientationChange, handleRaceChange, handleGeographyChange }) => {
  const [isStateFocused, setIsStateFocused] = useState(false);
  const [stateInputValue, setStateInputValue] = useState("");
  
  const [ dataOrientation, setDataOrientation] = useState({});
  const [ race, setRace ] = useState({});
  const [ placeState, setPlaceState ] = useState([]);

  useEffect(
    () => {
      if(!showCollapse){
        setDataOrientation({});
        setRace({});
        setPlaceState([]);
      }
    }
    ,[showCollapse]
  );
  
  return (
    <Collapse in={ showCollapse } >
      <div>

        {/* begin: Data Orientation */}
        <div className="mb-2">
          <Form.Label className="mb-0">
            Data Orientation
          </Form.Label>
          <ReactSelect
            options={ dataOrientationOption }
            defaultValue={ dataOrientationOption[0] }
            styles={{ ...ReactSelectStyle1 }}
            placeholder="Select.."
            onChange={ (selected) => {
              setDataOrientation(selected);
              handleDataOrientationChange(type, selected.value);
            }}
            value={ dataOrientation }
          />
        </div>
        {/* end: Data Orientation */}

        {/* begin: Race */}
        <div className="mb-2">
          <Form.Label className="mb-0">
            Race
          </Form.Label>
          <ReactSelect
            options={ raceOption }
            defaultValue={ raceOption[0] }
            styles={ ReactSelectStyle1 }
            placeholder="Select.."
            onChange={ (selected) => {
              setRace(selected);
              handleRaceChange(type, selected.value);
            }}
            value={ race }
            
          />
        </div>
        {/* end: Race */}

        {/* begin: Geography */}
        <div className="mb-2">
          <Form.Label className="mb-0">
            Geography
          </Form.Label>
          <ReactSelect 
            options={ groupStateOptions }
            isMulti
            components={{
              MenuList: stateMenuListComponent,
              Option: stateOptionComponent,
              MultiValueRemove: stateMultiValueRemoveComponent,
              ValueContainer: stateValueContainerComponent,
              DropdownIndicator: stateDropdownIndicatorComponent,
              ClearIndicator: () => null,
              GroupHeading: stateGroupHeadingComponent
            }}
            isDisabled={ 
              Object.keys(dataOrientation).length === 0 &&
              Object.keys(race).length === 0
            }
            styles={{
              control: (base) => ({
                ...base,
                "&:hover": {
                  backgroundColor: "#D3ECFF"
                },
                minHeight: "30px"
              }),
              dropdownIndicator: (base) => ({
                ...base,
                justifyContent: "space-between"
              }),
              indicatorSeparator:(base) => ({
                ...base,
                width: 0
              }),
              groupHeading: (base) => ({
                ...base,
                textTransform: "none"
              }),
              multiValue: (base) => ({
                ...base,
                ...customFontStyles({
                  ...fontStyles,
                  fontSize: "11px",
                  lineHeight: "15px",
                  color: "#000000"
                }),
                backgroundColor: "#DFE6E9",
                borderRadius: "4px"
              }),
              option: (base, state) => ({
                ...base,
                ...customFontStyles({ ...fontStyles, color: "#000000" }),
                backgroundColor: state.isSelected ? "#72BBF4" : base.backgroundColor,
                "&:hover": { 
                  backgroundColor: state.isSelected ? "#086EBE" : base.backgroundColor,
                  cursor: "pointer"                                   
                }
              }),
              placeholder: (base) => ({
                ...base,
                ...customFontStyles({ ...fontStyles, color: "#B2BEC3" })
              })
            }}
            filterOption={createFilter({ matchFrom: "start" })}
            hideSelectedOptions={ false }
            stateInputValue={ stateInputValue }
            isSearchable={ false }
            closeMenuOnSelect={ false }
            onMenuInputFocus={() => setIsStateFocused(true)}
            onChange={(options) => {
              setPlaceState(options);
              setIsStateFocused(false)
              handleGeographyChange(type, options.map((option) => option.value));
            }}
            value={ placeState }
            onInputChange={(value) => setStateInputValue(value)}
            {...{
              menuIsOpen: isStateFocused || undefined,
              isFocused: isStateFocused || undefined
            }}
          />
          <div className="text-end custom-style-1">Advanced options</div>
        </div>
        {/* end: Geography */}

        <div className="d-flex justify-content-between">
          <div>
            <PlusLg className="me-2 plusLgStyle1" />
            <span className="custom-style-1">Add denominator { `(max: 2)` }</span>
          </div>
        </div>
      </div>
    </Collapse>
  );
}

export default CollapseContent;
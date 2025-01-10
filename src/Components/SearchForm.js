import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SearchForm.css';

function SearchForm({ setSearchInput }) {
  // State attributes for form fields
  const [type, setType] = useState(null);
  const [dateAdded, setDateAdded] = useState(null);
  const [isClicked, setIsClicked] = useState(false); // button to display and hide advance search form

  // State for form filter attributes
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [postcode, setPostcode] = useState("");
  const [location, setLocation] = useState("");

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();//stop page refreshing automatically

    // Check if at least one field has been filled
    if (
      !type?.value &&
      !dateAdded &&
      !minPrice &&
      !maxPrice &&
      !minBedrooms &&
      !maxBedrooms &&
      !postcode &&
      !location
    ) {
      
      alert("Please Fill at least one search Input.");
      return; // Go back
    }

    // Pass the search form details to the parent component setSearchInput
    setSearchInput({
      type: type?.value || "",
      dateAdded,
      minPrice,
      maxPrice,
      minBedrooms,
      maxBedrooms,
      postcode,
      location,
    });
  };


  //clear button click function
  const handleClear = () => {
    // Reset all form states to clear values
    setType(null);//pass String value of type
    setDateAdded(null);
    setMinPrice("");
    setMaxPrice("");
    setMinBedrooms("");
    setMaxBedrooms("");
    setPostcode("");
    setLocation("");
    setSearchInput({}); // Clear search in parent component
  };

  // Options for the property type dropdown react widgets
  const typeOptions = [
    { value: 'house', label: 'House' },
    { value: 'flat', label: 'Flat' },
    { value: 'any', label: 'Any' },
  ];

  // Display advanced search Form
  const handleButtonClick = () => {
    setIsClicked((prevState) => !prevState); // Toggle visibility state
  };

  return (
    <>
      {/* Button to change css className to add css for diplay advanced search form */}
      <button className="show" onClick={handleButtonClick}>
        {isClicked ? 'Hide Advanced Search' : 'Show Advanced Search'}
      </button>

      {/* Advanced search form */}
      <div className={`search-form-container ${isClicked ? 'visible' : 'hidden'}`}>
        {isClicked && (
          <form className="search-form" onSubmit={handleSearch}>
            {/* Property Type Selection */}
            <div className="form-group">
              <label htmlFor="type">Property Type:</label>
              <Select
                options={typeOptions} // Dropdown options for property type
                value={type} // Selected type
                onChange={setType} // Update type when selection changes
                placeholder="Select Type"
              />
            </div>

            {/* Price Range Inputs */}
            <div className="form-group">
              <label>Price Range</label>
              <input
                type="number"//Ensure only enter number
                placeholder="Min-Price"
                className="form-control"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)} // Update minPrice when the value changing
              />
              <input
                type="number"
                placeholder="Max-Price"
                className="form-control"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)} 
              />
            </div>

            {/* Bedrooms Inputs */}
            <div className="form-group">
              <label>Bedrooms</label>
              <input
                type="number"
                placeholder="Min-Bedrooms"
                className="form-control"
                value={minBedrooms}
                onChange={(e) => setMinBedrooms(e.target.value)} 
              />
              <input
                type="number"
                placeholder="Max-Bedrooms"
                className="form-control"
                value={maxBedrooms}
                onChange={(e) => setMaxBedrooms(e.target.value)} 
              />
            </div>

            {/* Date Added Picker */}
            <div className="form-group">
              <label>Date Added</label>
              <DatePicker  //use react widjets
                selected={dateAdded}
                onChange={setDateAdded} 
                placeholderText="Select Date"
                className="form-control"
              />
            </div>

            {/* Postcode Input */}
            <div className="form-group">
              <label>Postcode</label>
              <input
                type="text"
                placeholder="Enter Postcode"
                className="form-control"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)} 
              />
            </div>

            {/* Location Input */}
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="Enter Location"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)} 
              />
            </div>

            {/* Search and Clear buttons */}
            <div className="search">
              <button type="button" onClick={handleSearch}>Search</button> {/* Sending  values to app componet to ubdate states and filter data */}
              <button type="button" onClick={handleClear}>Clear Form</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default SearchForm;

import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // Import the default styles in react tab libary
import jsonData from "../data/properties.json";
import "./PropertyItemDisplay.css";

function PropertyItem({ fav, setFav, inValue, setSearchInput }) {
  const data = jsonData.properties;

  // State hooks to manage the new window popup and image slider
  const [newWindow, setWindow] = useState(false);
  const [property, setProperty] = useState(null); // Send the property item 
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 

  
  function openNewWindow(propertyVal) {
    setProperty(propertyVal);
    setCurrentImageIndex(0); // Reset the image index when new window open image will display from the 1
    setWindow(true); 
  }

  
  function closeNewWindow() {
    setProperty(null); // window close set open model details reset
    setWindow(false); 
  }

  // Handle next image in the slider
  const handleNextImage = () => {
    setCurrentImageIndex(
      currentImageIndex === property.picArray.length - 1
        ? 0 
        : currentImageIndex + 1 
    );
  };

  // Handle previous image in the slider
  const handlePreviousImage = () => {
  setCurrentImageIndex(
    currentImageIndex === 0 ?
      property.picArray.length - 1  
     : currentImageIndex - 1
  );
};


  // Filter properties based on search input and filter conditions doesn't matter Uppercase or Lowercase
  const filteredData = data.filter((item) => {
    const matchesType =
      !setSearchInput.type || setSearchInput.type === "any" || item.type.toLowerCase() === setSearchInput.type;
    const matchesAvailability =
      !setSearchInput.availability ||
      item.availability.toLowerCase() === setSearchInput.availability;
    const matchesPrice =
      (!setSearchInput.minPrice || item.price >= setSearchInput.minPrice) &&
      (!setSearchInput.maxPrice || item.price <= setSearchInput.maxPrice);
    const matchesBedrooms =
      (!setSearchInput.minBedrooms || item.bedrooms >= setSearchInput.minBedrooms) &&
      (!setSearchInput.maxBedrooms || item.bedrooms <= setSearchInput.maxBedrooms);
    const matchesLocation =
      !setSearchInput.location ||
      item.location.toLowerCase().includes(setSearchInput.location.toLowerCase());

    const matchesPostcode =
      !setSearchInput.postcode ||
      item.postcode.toLowerCase().startsWith(setSearchInput.postcode.toLowerCase());

    // Helper function to convert month names to numbers
    const getMonthNumber = (monthName) => {
      const months = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3,
        'May': 4, 'June': 5, 'July': 6, 'August': 7,
        'September': 8, 'October': 9, 'November': 10, 'December': 11
      };
      return months[monthName] || 0;
    };

    // New date matching logic
    const matchesDate = () => {
      if (!setSearchInput.dateAdded) return true; // If no date is selected, return all properties

      const searchDate = new Date(setSearchInput.dateAdded);
      // Reset time portion for accurate date comparison
      searchDate.setHours(0, 0, 0, 0);

      // Create date from property's date fields
      const propertyDate = new Date(
        item.added.year,
        getMonthNumber(item.added.month), // Convert month name to number (0-11)
        parseInt(item.added.day)
      );
      propertyDate.setHours(0, 0, 0, 0);

      // Compare dates
      return propertyDate.getTime() === searchDate.getTime();
    };

    return (
      matchesType &&
      matchesAvailability &&
      matchesPrice &&
      matchesBedrooms &&
      matchesLocation &&
      matchesPostcode &&
      matchesDate()
    );
  });

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFav(savedFavorites); // Initialize state from localStorage
  }, [setFav]);

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(fav)); // Update localStorage
  }, [fav]);

  // Add property to favorites if not already present
  const handleAddToFavorites = (val) => {
    // Check if the item already exists in the favorites array
    if (!fav.some((item) => item.id === val.id)) {
      setFav([...fav, val]); // Add the item to favorites
    } else {
      alert("This item is already in your favorites!");
    }
  };

  // Handle drag event (for dragging properties)
  const handleOnDrag = (e, val) => {
    e.dataTransfer.setData("property", JSON.stringify(val)); // Store the dragged property data
  };

  // Handle dragover event to allow dropping
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent auto refreshing
  };

  // Handle drop event to remove property from favorites
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedData = JSON.parse(e.dataTransfer.getData("property"));
    setFav(fav.filter((item) => item.id !== droppedData.id)); // Remove the dropped property from favorites
  };

  return (
    <div
      className="property-container"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Render filtered properties based on search condition*/}
      {filteredData
        .filter((item) => {
          const searchValue = inValue.toLowerCase();
          const typeMatch = item.type.toLowerCase().includes(searchValue);
          const locationMatch = item.location.toLowerCase().includes(searchValue);
          const descriptionMatch = item.description.toLowerCase().includes(searchValue);

          return searchValue === "" || typeMatch || locationMatch || descriptionMatch;
        })
        .map((val) => (
          <div
            className="property-item"
            draggable
            onDragStart={(e) => handleOnDrag(e, val)}
            key={val.id}
          >
            {/* Property details */}
            <img
              src={val.picture}
              alt="property"
              onClick={() => openNewWindow(val)} // Pass the clicked property to openNewWindow to display in new Window When it's Clicked
            />
            <h3>{val.type}</h3>
            <h3>Price: ${val.price}</h3>
            <p> <i className="bi bi-segmented-nav"></i> Bedrooms: {val.bedrooms}</p>
            <p> <i className="bi bi-calendar" style={{margin:'5px'}}></i>
              Date Added : {val.added.day}, {val.added.month}, {val.added.year}
            </p>
            <p>   <i className="bi bi-geo-alt-fill" style={{color:'red'}}></i> Location: {val.location}</p>

            {/* Add to favorites button */}
            <button
              value={fav}
              onClick={() => {
                handleAddToFavorites(val);
              }}
            > <i className="bi bi-heart-fill" style={{ marginRight: '8px' , color:'red'}} ></i> 
                  Add to Favorite
            </button>
          </div>
        ))}

    {/* Modal for selected property */}
    <div>
      {newWindow && property && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeNewWindow}>
            <i className="bi bi-x-square"></i>
            </button>

            {/* Image Slider */}
            <div className="slider-container">
              <button className="slider-button" onClick={handlePreviousImage}>
              <i className="bi bi-arrow-left"></i>
              </button>
              <img
                src={property.picArray[currentImageIndex]}
                alt="Selected Property"
                style={{ width: "80%" }}
                draggable={newWindow ? false : true}  // Prevent unwanted drags when the modal is open
              />
              <button className="slider-button" onClick={handleNextImage}>
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>

            <i className="bi bi-card-image" style={{ color: 'red', marginRight: '10px' ,fontSize: '1.5rem'}}></i>
            <span style={{fontSize:'1.3rem'}}>{currentImageIndex + 1}</span>

            {/* Tabbed Content for Property Details, Floorplan, and Map */}
            <Tabs>
              <TabList>
                <Tab>Details</Tab>
                <Tab>Floor-Plan</Tab>
                <Tab>Map</Tab>
              </TabList>

              <TabPanel>
                <div className="details-tab">
                  <h3>{property.type}</h3>
                  <p>Price: ${property.price}</p>
                  <p> <i className="bi bi-segmented-nav" style={{margin:'5px'}}></i>
                    Bedrooms: {property.bedrooms}</p>
                  <p><i className="bi bi-geo-alt-fill" style={{color:'red',margin:'3px'}}></i>
                    Location: {property.location}</p>
                  <p> <i className="bi bi-calendar" style={{margin:'5px'}}></i>
                    Date Added: {property.added.day},{" "}
                    {property.added.month}, {property.added.year}
                  </p>
                  <p>{property.description}</p>
                </div>
              </TabPanel>

              {/* Floorplan */}
              <TabPanel>
                <img 
                    src={property.Floorplan} 
                    alt="Floorplan01"
                    allowFullScreen 
                    referrerPolicy="no-referrer"
                    className="floorplan-image "
                />
              </TabPanel>

              {/* Map */}
              <TabPanel>
                <iframe  className="map"
                  title={`Map for ${property.name}`} 
                  src={property.LocationURL}
                  style={{ border: 0 }} 
                  allowFullScreen
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}

export default PropertyItem;

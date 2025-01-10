import React from "react";
import './FavList.css';

function FavList({ fav, setFav }) {

  // Handle the deletion of a single favorite property by its ID
  const handleDelete = (id) => {
    setFav(fav.filter(item => item.id !== id)); // Filter out the property from the favorites list
  };

  // Handle the deletion of all favorite properties
  const handleAllDelete = () => {
    setFav([]); // Clear the entire favorites list
  };

  // Handle drag over event (necessary for drop to work)
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default browser behavior for drag over
  };

  // Handle the drop of a property (when dragged from another component)
  const handleDrop = (e) => {
    e.preventDefault(); // Prevent default behavior
    const droppedData = JSON.parse(e.dataTransfer.getData("property")); // Get the dropped data (property)

    // If the property is not already in favorites, add it to the list
    if (!fav.some((item) => item.id === droppedData.id)) {
      setFav([...fav, droppedData]); // Add the dropped property to favorites
    } else {
      alert("This item is already in your favorites!"); // Alert if the item is already a favorite
    }
  };

  return (
    <div
      className="favorites-container"
      onDrop={handleDrop} // Handle drop event when dragging properties here
      onDragOver={handleDragOver} // Allow dragging over the container
    >
      <h2>Favorites</h2>
      {fav.length > 0 ? (
        <ul>
          {/* Button to delete all favorites */}
          <button onClick={() => handleAllDelete()}>
            <i className="bi bi-trash-fill" style={{ margin: '5px' }}></i>Delete all
          </button>

          {/* Render each favorite item in the list */}
          {fav.map((item) => (
            <li
              draggable
              onDragStart={(e) => e.dataTransfer.setData("property", JSON.stringify(item))} // Store the dragged item data
              key={item.id}
            >
              {/* Property image */}
              <img src={item.picture} alt="pic" />
              {/* Property details */}
              {item.type} - ${item.price} - {item.location}
              {/* Button to delete a specific favorite item */}
              <button onClick={() => handleDelete(item.id)}>
                <i className="bi bi-trash-fill" style={{ margin: '5px' }}></i>Delete
              </button>
              <br />
            </li>
          ))}
        </ul>
      ) : (
        // Message when no favorites exist
        <p>No favorite items yet!</p>
      )}
    </div>
  );
}

export default FavList;

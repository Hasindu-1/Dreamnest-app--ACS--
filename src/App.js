import { useState } from 'react';
import './App.css';
import FavList from './Components/FavList';
import Header from './Components/Header';
import PropertyItem from './Components/PropertyItem';
import SearchForm from './Components/SearchForm';
import jsonData from "./data/properties.json";//Jason file data
import 'bootstrap-icons/font/bootstrap-icons.css';//import bootstrap icons


function App() {
    // State for managing favorite 
    const [fav, setFav] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    // Global state for serch value in header section Search bar
    const [inValue, setInValue] = useState("");

    // State for handle buttons in header section and Form 
    const [searchInput, setSearchInput] = useState({});

    return (
        <div className="App">
            
            <Header inValue={inValue} setInValue={setInValue} setSearchInput={setSearchInput} />
            <SearchForm setSearchInput={setSearchInput} />
            <PropertyItem 
                fav={fav} 
                setFav={setFav} 
                inValue={inValue} 
                setInValue={setInValue}
                jsonData={jsonData}
                setSearchInput={searchInput}
            />
            <FavList fav={fav} setFav={setFav} />
        </div>
    );
}

export default App;

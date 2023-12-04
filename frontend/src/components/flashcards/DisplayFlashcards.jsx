import React, { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList.jsx';
import EmptyCategoriesState from './EmptyCategoriesState.jsx';  
import config from '../../config.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

function DisplayFlashcards() {
  const [categories, setCategories] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('token'));
  const [clickedCategory, setClickedCategory] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    axios.get(`${config.apiUrl}/categories?user_email=${userEmail}`)
      .then((res) => {
        setCategories(res.data);
        setLoadingCategories(false);
      })
      .catch((error) => {
        console.error('Error loading categories:', error);
        setLoadingCategories(false);
      });
  }, [userEmail]);

  useEffect(() => {
    if (selectedCategory) {
      axios.get(`${config.apiUrl}/flashcards?category=${selectedCategory}&user_email=${userEmail}`)
        .then((res) => {
          setFlashcards(res.data);
        })
        .catch((error) => {
          console.error('Error loading flashcards:', error);
        });
    } else {
      setFlashcards([]);
    }
  }, [selectedCategory, userEmail]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setClickedCategory(category);
  };

  const handleReturnToCategories = () => {
    setSelectedCategory('');
    setClickedCategory('');
  };

  return (
    <>
      <form className="header">
        <Link to="/app/flashcards/manage" className="button-link">
          Manage Flashcards
        </Link>
        {selectedCategory && (
          <button className="button-link ml-2" onClick={handleReturnToCategories}>
            Return to Categories
          </button>
        )}
        <div className="form-group">
        <div className={`flex flex-wrap mt-4 ${selectedCategory ? 'hidden' : 'block'}`}>
          {categories.map((category) => (
            <div
              key={category}
              className={`group relative flex flex-col justify-center items-center w-32 h-32 cursor-pointer rounded-xl border border-blue-gray-50 bg-white px-3 py-2 transition-all hover:scale-105 hover:border-blue-gray-100 hover:bg-blue-gray-50 hover:bg-opacity-25 mb-4 mr-4`}
              onClick={() => handleCategoryClick(category)}
            >
              <p className="text-center">{category}</p>
            </div>
            ))}
          </div>
        </div>
      </form>

      {loadingCategories && <p>Loading categories...</p>}
      {!loadingCategories && categories.length === 0 && <EmptyCategoriesState />}

      {selectedCategory && (
        <div className="flashcard-buttons-container">
        </div>
      )}

      {selectedCategory && (
        <div className="flashcard-list-container">
          <FlashcardList flashcards={flashcards} />
        </div>
      )}
    </>
  );
}

export default DisplayFlashcards;

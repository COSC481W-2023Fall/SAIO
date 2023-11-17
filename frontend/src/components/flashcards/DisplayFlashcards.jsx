import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList.jsx';
import config from '../../config.js';
import '../../style/Flashcards.css';
import {Link} from "react-router-dom";
import axios from 'axios';

function DisplayFlashcards() {
  const [categories, setCategories] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userEmail, setUserEmail] = useState('test2@gmail.com');

  useEffect(() => {
    axios.get(`${config.apiUrl}/categories?user_email=${userEmail}`).then((res) => {
      setCategories(res.data);
    });
  }, [userEmail]);

  useEffect(() => {
    if (selectedCategory) {
      axios.get(`${config.apiUrl}/flashcards?category=${selectedCategory}&user_email=${userEmail}`).then((res) => {
        setFlashcards(res.data);
      });
    } else {
      // Clear flashcards if no category selected
      setFlashcards([]);
    }
  }, [selectedCategory, userEmail]);

  return (
    <>
      <form className="header">
      <Link to="/app/flashcards/manage"> Manage Flashcards </Link>
        <div className="form-group">
          <label htmlFor="newFlashcardCategory">Category</label>
          <select
            id="newFlashcardCategory"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

export default DisplayFlashcards;
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import config from '../../config';
import '../../style/Flashcards.css';
import {Link} from "react-router-dom";

const FlashcardManagement = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [categoryToDelete, setCategoryToDelete] = useState('');
  const [flashcardToDelete, setFlashcardToDelete] = useState('');
  const [userEmail, setUserEmail] = useState('test2@gmail.com');
  const categoryEl = useRef();
  const flashcardQuestionEl = useRef();
  const flashcardAnswerEl = useRef();
  const flashcardOptionsEl = useRef();
  const [selectedFlashcardForEdit, setSelectedFlashcardForEdit] = useState(null);
  const [editedFlashcard, setEditedFlashcard] = useState({
    question: '',
    answer: '',
    options: '',
  });

  useEffect(() => {
    axios.get(`${config.apiUrl}/categories?user_email=${userEmail}`).then((res) => {
      setCategories(res.data);
    });
  }, [categoryToDelete, userEmail]);

  useEffect(() => {
    if (selectedCategory) {
      axios.get(`${config.apiUrl}/flashcards?category=${selectedCategory}&user_email=${userEmail}`).then((res) => {
        setFlashcards(res.data);
        console.log('Flashcards Response:', res.data);
      });
    }
  }, [selectedCategory, flashcardToDelete, userEmail]);

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    const newCategory = categoryEl.current.value;
    if (newCategory.trim()) {
      axios.post(`${config.apiUrl}/categories`, { name: newCategory, user_email: userEmail }).then(() => {
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        categoryEl.current.value = '';
      });
    }
  };

  const handleFlashcardSubmit = (e) => {
    e.preventDefault();
    const question = flashcardQuestionEl.current.value;
    const answer = flashcardAnswerEl.current.value;
    const options = flashcardOptionsEl.current.value.split(',');
  
    if (question.trim() && answer.trim() && selectedCategory && options.length > 0) {
      axios.post(`${config.apiUrl}/flashcards`, {
        question: question,
        answer: answer,
        options: options,
        category: selectedCategory,
        user_email: userEmail,
      }).then(() => {
        flashcardQuestionEl.current.value = '';
        flashcardAnswerEl.current.value = '';
        flashcardOptionsEl.current.value = '';
  
        // Fetch flashcards again after submitting
        axios.get(`${config.apiUrl}/flashcards?category=${selectedCategory}&user_email=${userEmail}`).then((res) => {
          setFlashcards(res.data);
          console.log('Flashcards Response:', res.data);
        });
      });
    }
  };
  

  const handleCategoryDelete = (category) => {
    axios.delete(`${config.apiUrl}/categories/${category}?user_email=${userEmail}`).then(() => {
      setCategories((prevCategories) => prevCategories.filter((c) => c !== category));
  
      // Check if the deleted category matches the selected category
      if (selectedCategory === category) {
        setSelectedCategory('');
        setFlashcards([]); // Set flashcards to an empty array only if the selected category is deleted
      }
  
      setCategoryToDelete(category); // Trigger a re-fetch of categories
    });
  };
  

  const handleFlashcardDelete = (flashcardId) => {
    console.log("Deleting flashcard with ID:", flashcardId);
    axios.delete(`${config.apiUrl}/flashcards/${flashcardId}`)
      .then(() => {
        setFlashcards((prevFlashcards) => prevFlashcards.filter((card) => card._id !== flashcardId));
      })
      .catch((error) => {
        console.error("Error deleting flashcard:", error);
      });
  };

  const handleEditFlashcard = (flashcard) => {
    setSelectedFlashcardForEdit(flashcard);
    setEditedFlashcard({
      question: flashcard.question,
      answer: flashcard.answer,
      options: flashcard.options.join(', '), // Convert options array to a comma-separated string
    });
  };

  const handleEditFlashcardSubmit = (e) => {
    e.preventDefault();
    const optionsArray = editedFlashcard.options.split(',').map((option) => option.trim());

    if (editedFlashcard.question.trim() && editedFlashcard.answer.trim() && selectedCategory && optionsArray.length > 0) {
      axios.put(`${config.apiUrl}/flashcards/${selectedFlashcardForEdit._id}`, {
        question: editedFlashcard.question,
        answer: editedFlashcard.answer,
        options: optionsArray,
        category: selectedCategory,
        user_email: userEmail,
      }).then(() => {
        setSelectedFlashcardForEdit(null);
        setFlashcardToDelete(editedFlashcard.question); // Trigger a re-fetch of flashcards
        setEditedFlashcard({
          question: '',
          answer: '',
          options: '',
        });
      });
    }
  };

  return (
    <div>
        <Link to="/app/flashcards"> Study Flashcards </Link>
      <form onSubmit={handleCategorySubmit}>
        <label>New Category:</label>
        <input type="text" ref={categoryEl} required />
        <button type="submit">Add Category</button>
      </form>

      <form onSubmit={handleFlashcardSubmit}>
        <label>Category:</label>
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory} required>
          <option value="" disabled>
            Select set
          </option>
          {categories.map((category) => (
            <option value={category} key={category.toString()}>
              {category}
            </option>
          ))}
        </select>

        <label>Question:</label>
        <input type="text" ref={flashcardQuestionEl} required />

        <label>Answer:</label>
        <input type="text" ref={flashcardAnswerEl} required />

        <label>Options (comma-separated):</label>
        <input type="text" ref={flashcardOptionsEl} />

        <button type="submit">Generate Flashcards</button>
      </form>

      <div>
        <h2>Flashcards</h2>
        <div className="container">
          {flashcards.map((flashcard) => (
            <div key={flashcard._id}>
                {console.log(flashcard)}
              <p>{flashcard.question}</p>
              <button onClick={() => handleFlashcardDelete(flashcard._id)}>Delete</button>
              <button onClick={() => handleEditFlashcard(flashcard)}>Edit</button>

              {selectedFlashcardForEdit === flashcard && (
                <form onSubmit={handleEditFlashcardSubmit}>
                  <label>Question:</label>
                  <input type="text" value={editedFlashcard.question} onChange={(e) => setEditedFlashcard({ ...editedFlashcard, question: e.target.value })} required />

                  <label>Answer:</label>
                  <input type="text" value={editedFlashcard.answer} onChange={(e) => setEditedFlashcard({ ...editedFlashcard, answer: e.target.value })} required />

                  <label>Options (comma-separated):</label>
                  <input type="text" value={editedFlashcard.options} onChange={(e) => setEditedFlashcard({ ...editedFlashcard, options: e.target.value })} />

                  <button type="submit">Save Changes</button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Categories</h2>
        <div className="container">
          {categories.map((category) => (
            <div key={category}>
              <p>{category}</p>
              <button onClick={() => handleCategoryDelete(category)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashcardManagement;

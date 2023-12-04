import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import config from '../../config';
import {Link} from "react-router-dom";

const FlashcardManagement = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [categoryToDelete, setCategoryToDelete] = useState('');
  const [flashcardToDelete, setFlashcardToDelete] = useState('');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('token'));
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
    <div className="container">
      <Link to="/app/flashcards" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Study Flashcards
      </Link>
  
      <div className="form-container mt-4">
        <form onSubmit={handleCategorySubmit} className="mb-4">
          <label className="block">New Category:</label>
          <input type="text" ref={categoryEl} required className="border p-2 w-full" />
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Category</button>
        </form>
  
        <form onSubmit={handleFlashcardSubmit} className="mb-4">
          <label className="block">Category:</label>
          <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory} required className="border p-2 w-full">
            <option value="" disabled>Select set</option>
            {categories.map((category) => (
              <option value={category} key={category.toString()}>
                {category}
              </option>
            ))}
          </select>
  
          <label className="block">Question:</label>
          <input type="text" ref={flashcardQuestionEl} required className="border p-2 w-full" />
  
          <label className="block">Answer:</label>
          <input type="text" ref={flashcardAnswerEl} required className="border p-2 w-full" />
  
          <label className="block">Options (comma-separated):</label>
          <input type="text" ref={flashcardOptionsEl} className="border p-2 w-full" />
  
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Generate Flashcards</button>
        </form>
      </div>
  
      <div className="flex">
      <div className="flex-1">
        <h2>Flashcards</h2>
        <div className="flashcards-container">
          {flashcards.map((flashcard) => (
            <div key={flashcard._id} className="flashcard-item border p-4 rounded">
              <p>{flashcard.question}</p>
              <button onClick={() => handleFlashcardDelete(flashcard._id)} className="bg-red-500 text-white p-2">Delete</button>
              <button onClick={() => handleEditFlashcard(flashcard)} className="bg-blue-500 text-white p-2 ml-2">Edit</button>

              {selectedFlashcardForEdit === flashcard && (
                <form onSubmit={handleEditFlashcardSubmit} className="mt-4">
                  <div className="mb-4">
                    <label className="block">Question:</label>
                    <input
                      type="text"
                      value={editedFlashcard.question}
                      onChange={(e) => setEditedFlashcard({ ...editedFlashcard, question: e.target.value })}
                      required
                      className="border p-2 w-full"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block">Answer:</label>
                    <input
                      type="text"
                      value={editedFlashcard.answer}
                      onChange={(e) => setEditedFlashcard({ ...editedFlashcard, answer: e.target.value })}
                      required
                      className="border p-2 w-full"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block">Options (comma-separated):</label>
                    <input
                      type="text"
                      value={editedFlashcard.options}
                      onChange={(e) => setEditedFlashcard({ ...editedFlashcard, options: e.target.value })}
                      className="border p-2 w-full"
                    />
                  </div>

                  <button type="submit" className="bg-green-500 text-white p-2">Save Changes</button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <h2>Categories</h2>
        <div className="categories-container">
          {categories.map((category) => (
            <div key={category} className="category-item border p-4 rounded">
              <p>{category}</p>
              <button onClick={() => handleCategoryDelete(category)} className="bg-red-500 text-white p-2">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
  
};

export default FlashcardManagement;

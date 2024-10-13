import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  // Helper functions to interact with localStorage
  const saveNotes = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const loadNotes = () => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  };

  // Load notes from localStorage when component mounts
  useEffect(() => {
    const savedNotes = loadNotes();
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Function to save notes in localStorage when notes state changes
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;

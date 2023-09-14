import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {dKeeper} from "../../../declarations/dKeeper"
 
function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      //adding new note to backend
      dKeeper.createNote(newNote.title, newNote.content)
      //order to display notes
      return [newNote, ...prevNotes];
    });
  }

  //display the backend to frontend
  useEffect(() => {
    console.log("UseEffect triggered")
    fetchData();
  }, []);

  async function fetchData() {
    const notesArray = await dKeeper.readNotes();
    setNotes(notesArray);
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
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

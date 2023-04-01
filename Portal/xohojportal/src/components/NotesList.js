import Note from "./Note";
import AddNote from "./AddNote";
import { useEffect, useState } from "react";
import axios from 'axios';

const NotesList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  notesFetch,
  setNotesFetch,
}) => {

  const [activeNotes, setActiveNotes] = useState([])

  useEffect(() => {
    const getData = async () => {
      const response =await axios.get('http://192.168.247.28:8002/api/notes/')
      console.log("activeNotes" , response.data.notes)
      setActiveNotes(response.data.notes);
    }
   getData()
  }, [])
  


  return (
    <div className="notes-list">
      { activeNotes.map((note) => {
        return(
          <>
          <Note
            id={note.id}
            createdAt={note.createdAt}
            url = {note.url}
            Topic={note.Topic}
            title={note.title}
            content={note.content}
            timestamped={note.timestamped}
            handleDeleteNote={handleDeleteNote}
          />
          </>
        )
        })}
      
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};

export default NotesList;

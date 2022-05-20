import React from "react";
import Note from "./Note.js";

const NotesList = (props) => {
  // {
  //   console.log(props);
  // }
  const keepSearchMatch = (note) => note.doesMatchSearch;
  const newNotesList = props.notes.filter(keepSearchMatch);
  const noteElements = newNotesList.map((note) => (
    <Note
      note={note}
      key={note.id}
      onType={props.onType}
      deleteNote={props.deleteNote}
    />
  ));
  return <ul className="notes-list">{noteElements}</ul>;
};

export default NotesList;

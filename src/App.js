import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  addNote = () => {
    const newNoteObject = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    this.setState({ notes: [newNoteObject, ...this.state.notes] });
  };

  onType = (editMeId, updatedKey, updatedValue) => {
    // editMeId == id of the note that was edited
    // updatedKey == title or description field
    // updatedValue = value of title or description
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    const searchedText = text.toLowerCase();
    const notesMatchwithSearch = this.state.notes.map((note) => {
      if (!searchedText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatched = title.includes(searchedText);
        const descriptionMatched = description.includes(searchedText);
        if (titleMatched || descriptionMatched) {
          note.doesMatchSearch = true;
          return note;
        } else {
          note.doesMatchSearch = false;
          return note;
        }
      }
    });
    this.setState({
      notes: notesMatchwithSearch,
      searchText: searchedText
    });
  };

  deleteNote = (clickedId) => {
    // Add delete functionality to the UI.
    // clickedId == id of the note that was clicked
    const notClickedId = (note) => note.id !== clickedId;
    const updatedNotes = this.state.notes.filter(notClickedId);
    this.setState({ notes: updatedNotes });
  };

  componentDidUpdate() {
    const savedNotesString = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotesString", savedNotesString);
  }
  componentDidMount() {
    const savedNotesString = localStorage.getItem("savedNotesString");
    if (savedNotesString) {
      const savedNotes = JSON.parse(savedNotesString);
      this.setState({ notes: savedNotes });
    }
  }

  render() {
    return (
      <div>
        <Header
          searchText={this.state.searchText}
          addNote={this.addNote}
          onSearch={this.onSearch}
        />
        <NotesList
          notes={this.state.notes}
          onType={this.onType}
          deleteNote={this.deleteNote}
        />
      </div>
    );
  }
}

export default App;

import React from "react";

const Header = (props) => {
  // {
  //   console.log(props);
  // }
  const searchNote = (e) => {
    const text = e.target.value;
    props.onSearch(text);
  };
  return (
    <header className="app-header__controls">
      {/* {console.log(props)} */}
      <h1 className="app-header__title">Super Sticky Notes</h1>
      <aside>
        <button onClick={props.addNote} className="add-new">
          + New Note
        </button>
        <input
          className="search"
          type="text"
          placeholder="Type here to search..."
          value={props.searchText}
          onChange={searchNote}
        />
      </aside>
    </header>
  );
};

export default Header;

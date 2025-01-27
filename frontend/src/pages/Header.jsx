import { useState } from "react";
import Title from "./Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  // const [notes, setNotes] = useState([]);
  const [isClick, setIsClick] = useState(false);
/*
  const addNote = () => {
    const newNote = { id: Date.now(), content: `Note ${notes.length + 1}` };
    setNotes([...notes, newNote]);
  };
*/
  const Sidebar = () => {
    setIsClick(!isClick);
    if (isClick){

    }
  }

  return (
    <header
      className={`flex justify-center bg-gray-500 shadow-2xl h-full pl-0 w-full lg:pl-4 ${
      isClick ? "lg:w-24" : "lg:w-80"
    }`}
    >
      <div>
        <Link
          to="/login"
          className="absolute right-8 top-4 text-base font-semibold text-white hover:text-gray-400 rounded transition duration-300 lg:text-black"
        >
          Login
        </Link>
      </div>
      <Title isClick={isClick} />
      <div className="invisible lg:visible">
        <button
          className="flex items-center justify-center mt-1 w-8 h-10 text-white"
          onClick={Sidebar}
        >
          {!isClick ? (
            <FontAwesomeIcon icon={faCaretLeft} />
          ) : (
            <FontAwesomeIcon icon={faCaretRight} />
          )}
        </button>
      </div>
      <div>
        {/**<div>
          <button
            onClick={addNote}
            className="flex items-center justify-center w-full border-t border-b h-24 text-white text-sm font-medium hover:bg-gray-600 px-4 py-2 rounded transition duration-300"
          >
            + Add Note
          </button>
        </div>
        <div className="mt-4">
          {notes.map((note) => (
            <Link
              to={`/note/${note.id}`}
              key={note.id}
              className="flex items-center justify-center w-full border-t border-b h-24 text-white text-sm font-medium hover:bg-gray-600 px-4 py-2 rounded transition duration-300 mb-2"
            >
              {note.content}
            </Link>
          ))}
        </div>**/}
      </div>
    </header>
  );
};

export default Header;

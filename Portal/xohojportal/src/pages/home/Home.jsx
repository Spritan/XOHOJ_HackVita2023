import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import './home.css'
import Header from "../../components/Header";
import Search from "../../components/Search";
import FetchedNotes from "../../components/FetchedNotes";
import NotesList from "../../components/NotesList";

// import FetchedNotes from "./components/FetchedNotes";


const Home = () => {
  const { collapseSidebar } = useProSidebar();
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note!",
      date: "31/03/2023"
    },
    {
      id: nanoid(),
      text: "This is my Second note!",
      date: "31/03/2023"
    },
    {
      id: nanoid(),
      text: "This is my Third note!",
      date: "31/03/2023"
    },
    {
      id: nanoid(),
      text: "This is my Fourth note!",
      date: "31/03/2023"
    },
  ]);

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes]);


  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };


  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }






  return (
    // <div className={`${darkMode && 'dark-mode'}`}>
    //   <Sidebar style={{ height: "100vh" }}>
    //     <Menu>
    //       <MenuItem
    //         icon={<MenuOutlinedIcon />}
    //         onClick={() => {
    //           collapseSidebar();
    //         }}
    //         style={{ textAlign: "center" }}
    //       >
    //         {" "}
    //         <h2>Admin</h2>
    //       </MenuItem>
    //       <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
    //       <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
    //       <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
    //       <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
    //       <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
    //       <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
    //     </Menu>
    //   </Sidebar>
    //   <main>
    //     <div className="container">
    // {/* <Header handleToggleDarkMode={setDarkMode} /> */}
    // {/* <Search handleSearchNote={setSearchText} />
    // <NotesList
    //   notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))}
    //   handleAddNote={addNote}
    //   handleDeleteNote={deleteNote}
    // /> */}
    //         lorem.loremngfgngwriogbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbrn
    //       </div>

    //       </main>
    //   </div>
    // );
    <div className = {`${darkMode && 'dark-mode'}`} style={{ display: 'flex'}}>
      <Sidebar style={{ height: "100vh" }}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h2>Admin</h2>
          </MenuItem>
          <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
          <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{width: "100%"}}>
        {/* <button onClick={() => collapseSidebar()}>Collapse</button> */}
        <div className="container" style={{marginLeft: "5rem" }}>
          <Header handleToggleDarkMode={setDarkMode} />
          <Search handleSearchNote={setSearchText} />
          {/* <FetchedNotes /> */}
          <FetchedNotes />
          <NotesList
            notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))}
            handleAddNote={addNote}
            handleDeleteNote={deleteNote}
          />
          
        </div>
      </main>
    </div>);
};

export default Home;
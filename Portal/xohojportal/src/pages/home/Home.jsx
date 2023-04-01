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
import "./home.css";
import Header from "../../components/Header";
import Search from "../../components/Search";
import FetchedNotes from "../../components/FetchedNotes";
import NotesList from "../../components/NotesList";
import axios from "axios";
import jsonToMarkdown from 'json-to-markdown';
import { Link } from 'react-router-dom'

// AIzaSyDimfJEO9_jZTXC7KIkmwxvOpAmA6vqEkU

// import FetchedNotes from "./components/FetchedNotes";

const Home = () => {
  const { collapseSidebar } = useProSidebar();
  const [notes, setNotes] = useState([
    // {
    //   id: nanoid(),
    //   text: "This is my first note!",
    //   date: "31/03/2023"
    // },
    // {
    //   id: nanoid(),
    //   text: "This is my Second note!",
    //   date: "31/03/2023"
    // },
    // {
    //   id: nanoid(),
    //   text: "This is my Third note!",
    //   date: "31/03/2023"
    // },
    // {
    //   id: nanoid(),
    //   text: "This is my Fourth note!",
    //   date: "31/03/2023"
    // },
  ]);

  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));

  //   if (savedNotes) {
  //     setNotes(savedNotes);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  // }, [notes]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://192.168.247.28:8002/api/notes/");
      // console.log(response.data.notes)
      setNotes(response.data.notes);
    };
    getData();
  }, []);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const handleConvert = () => {

    const myObject = notes.reduce((obj, item) => {
      obj[item.id] = item;
      return obj;
    }, {});

    const jsonData = myObject
    const markdownData = jsonToMarkdown(jsonData);
    const obsidian = window.app;

    obsidian.vault.createMarkdownFile('my-note-title.md', markdownData);

  };

  const handlePdf = () => {
    var printContents = document.getElementById("printible").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

  return (
    <div className={`${darkMode && "dark-mode"}`} style={{ display: "flex" }}>
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
          <MenuItem icon={<HomeOutlinedIcon />} >
            <Link to="/" style={{ padding: 5 }}>
              Home
            </Link></MenuItem>
          <MenuItem icon={<ReceiptOutlinedIcon />}><Link to="/cert" style={{ padding: 5 }}>
          Certificate
            </Link></MenuItem>
          {/* <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
          <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem> */}
        </Menu>
      </Sidebar>
      <main id="printible" style={{ width: "100%" }}>
        {/* <button onClick={() => collapseSidebar()}>Collapse</button> */}
        <div className="container" style={{ marginLeft: "5rem" }}>
          <Header handleToggleDarkMode={setDarkMode} />
          <Search handleSearchNote={setSearchText} />
          {/* <FetchedNotes /> */}
          <FetchedNotes />
          <NotesList
            notes={notes}
            handleAddNote={addNote}
            handleDeleteNote={deleteNote}
          />

          <div className="btnConvertor">
            <button className="btn-doc-convert" onClick={handleConvert}>
              {" "}
              Convert to obsedian{" "}
            </button>
            <button className="btn-doc-convert" onClick={handlePdf}>
              {" "}
              Print as PDF{" "}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

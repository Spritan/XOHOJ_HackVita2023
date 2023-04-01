import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "./cert.css";

import { Link } from 'react-router-dom'
import BasicCard from "../../components/BasicCard";
import axios from "axios";

const Cert = () => {
    const { collapseSidebar } = useProSidebar();
    const host = 'http://192.168.247.28:8002/api/notes/cert/'
    const [rows, setRows] = useState([])

    useEffect(() => {
        const getCertData = async () => {
          const res = await axios.get(`${host}`)
    
          // res.data.students.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          console.log(res.data.notes)
          setRows(res.data.notes)
        }
        getCertData()
    
      }, [])
    return (
        <div style={{"display": "flex", "flex-direction": "row"}}>
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
                </Menu>
            </Sidebar>
            <main style={{ width: "80%" }}>
                {rows.map(eachData => (
                    <BasicCard title={eachData.title} completion= {eachData.completed? eachData.completed: 0} certified= "yes" id={eachData.id}/>
                ))}
                
            </main>
        </div>
    )
}

export default Cert
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './certs.css'
import axios from 'axios'

const Certs = () => {

    const {id} = useParams()

    const host = `http://192.168.247.28:8002/api/notes/cert/${id}`
    const [rows, setRows] = useState([])

    useEffect(() => {
        const getCertData = async () => {
          const res = await axios.get(`${host}`)
    
          // res.data.students.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          console.log(res.data.note)
          setRows(res.data.note)
        }
        id && getCertData()
    
      }, [id])




    

    return (
        <div className="outer-border">
            <div className="inner-dotted-border">
                <span className="certification">Certificate of Completion</span>
                <br />
                <br />
                <span className="certify">
                    <i>This is to certify that</i>
                </span>
                <br />
                <br />
                <span className="name">
                    <b>Daniel Vitorrie</b>
                </span>
                <br />
                <br />
                <span className="certify">
                    <i>has successfully completed the certification</i>
                </span>{" "}
                <br />
                <br />
                <span className="fs-30">{rows.title}</span> <br />
                <br />
                <span className="fs-20">
                    of <b>{~~rows.completed} %</b>
                </span>{" "}
                <br />
                <br />
                <br />
                <br />
                <span className="certify">
                    <i>dated</i>
                </span>
                <br />
                <span className="fs-30">23 March,2019</span>
            </div>
        </div>
    )
}

export default Certs
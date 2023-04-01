import { Delete, Edit } from "@mui/icons-material";
import Draggable from "react-draggable";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Note = ({
  id,
  Topic,
  title,
  url,
  content,
  timestamped,
  handleDeleteNote,
  createdAt,
}) => {

    const navigate = useNavigate()

    const handleDelete = async (id) => {
        await axios.delete(`http://192.168.247.28:8002/api/notes/${id}`)
        navigate(0)
    }

  return (
    <Draggable>
      <div className="note">
        <h2>{Topic}</h2>
        <h4>{title}</h4>
        <a href={url}>Link to video</a>
        <p>{timestamped}</p>
        <span>{content}</span>
        <div className="note-footer">
          <small>
            {new Date(createdAt).toLocaleString(undefined, {
              timeZone: "Asia/Kolkata",
            })}
          </small>
          <Edit/>
          <Delete
          style={{cursor: 'pointer'}}
          onClick={()=>{ handleDelete(id) }}
          />
        </div>
      </div>
    </Draggable>
  );
};

export default Note;

import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../Redux/slices/noteSlice';
import { toast } from 'react-toastify';
import styles from '../../NoteItem.module.css';

const Noteitem = (props) => {
    const dispatch = useDispatch();
    const { note, updateNote } = props;

    const handleDelete = () => {
        dispatch(deleteNote(note._id));
        toast.success("Note deleted successfully", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div className={`col-md-3 ${styles.noteContainer}`}>
            <div className={`card my-3 ${styles.noteCard}`}>
                <div className="card-body">
                    <div className={`d-flex align-items-center ${styles.cardHeader}`}>
                        <h5 className={`card-title ${styles.cardTitle}`}>{note.title}</h5>
                        <i className={`fas fa-trash-alt mx-2 ${styles.iconDelete}`} onClick={handleDelete}></i>
                        <i className={`fas fa-edit mx-2 ${styles.iconEdit}`} onClick={() => updateNote(note)}></i>
                    </div>
                    <p className={`card-text ${styles.cardText}`}>{note.content}</p>
                </div>
            </div>
        </div>
    );
};

export default Noteitem;

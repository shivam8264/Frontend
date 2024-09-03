import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewNote } from '../Redux/slices/noteSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../addNote.module.css';

const AddNote = () => {
    const [note, setNote] = useState({ title: "", content: "", tag: "" });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(addNewNote({
                title: note.title,
                content: note.content,
                tag: note.tag
            }));
            setNote({ title: "", content: "", tag: "" });
            toast.success("Note Added successfully", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (note.title.trim().length < 3) {
            errors.title = "Title must be at least 3 characters";
            isValid = false;
        }

        if (note.content.trim().length < 5) {
            errors.content = "Content must be at least 5 characters";
            isValid = false;
        }

        if (note.tag.trim().length === 0) {
            errors.tag = "Tag is required";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    return (
        <div className={`container ${styles.container}`}>
            <h1 style={{fontWeight:"bold",textAlign:"center"}}>NewsBook</h1>
            <h2 style={{fontWeight:"bold"}}>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className={`form-label ${styles.formLabel}`}>Title*</label>
                    <input
                        type="text"
                        className={`form-control ${styles.formControl} ${errors.title && styles.isInvalid}`}
                        id="title"
                        name="title"
                        value={note.title}
                        onChange={onChange}
                    />
                    {errors.title && <div className={styles.invalidFeedback}>{errors.title}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className={`form-label ${styles.formLabel}`}>Content*</label>
                    <input
                        type="text"
                        className={`form-control ${styles.formControl} ${errors.content && styles.isInvalid}`}
                        id="content"
                        name="content"
                        value={note.content}
                        onChange={onChange}
                    />
                    {errors.content && <div className={styles.invalidFeedback}>{errors.content}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className={`form-label ${styles.formLabel}`}>Tag*</label>
                    <input
                        type="text"
                        className={`form-control ${styles.formControl} ${errors.tag && styles.isInvalid}`}
                        id="tag"
                        name="tag"
                        value={note.tag}
                        onChange={onChange}
                    />
                    {errors.tag && <div className={styles.invalidFeedback}>{errors.tag}</div>}
                </div>
                <button type="submit" className={`btn ${styles.btnPrimary}`} onClick={handleClick}>Add Note</button>
            </form>
        </div>
    );
};

export default AddNote;

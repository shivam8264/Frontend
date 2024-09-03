import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, updateNote } from '../Redux/slices/noteSlice';
import Noteitem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from '../../Note.module.css';

const Notes = () => {
    const [note, setNote] = useState({ id: "", etitle: "", econtent: "", etag: "" });
    const [errors, setErrors] = useState({});
    const ref = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes.items);

    useEffect(() => {
        document.body.style.backgroundColor = '#E6E6FA';
        if (localStorage.getItem('token')) {
            dispatch(fetchNotes());
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate]);

    const updateNoteItem = (currentNote) => {
        setErrors({});
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, econtent: currentNote.content, etag: currentNote.tag });
    };

    const handleClick = () => {
        if (validateForm()) {
            dispatch(updateNote({
                _id: note.id,
                title: note.etitle,
                content: note.econtent,
                tag: note.etag
            }));
            toast.success("Note updated successfully", {
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

        if (note.etitle.trim().length < 5) {
            errors.etitle = "Title must be at least 5 characters";
            isValid = false;
        }

        if (note.econtent.trim().length < 5) {
            errors.econtent = "Content must be at least 5 characters";
            isValid = false;
        }

        if (note.etag.trim().length === 0) {
            errors.etag = "Tag is required";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className={`modal-content ${styles.modalContent}`}>
                        <div className={`modal-header ${styles.modalHeader}`}>
                            <h5 className={`modal-title ${styles.modalTitle}`} id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className={`modal-body ${styles.modalBody}`}>
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className={styles.formLabel}>Title:</label>
                                    <input type="text" className={`${styles.formControl} ${errors.etitle && styles.isInvalid}`} id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
                                    {errors.etitle && <div className={styles.invalidFeedback}>{errors.etitle}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="econtent" className={styles.formLabel}>Content:</label>
                                    <input type="text" className={`${styles.formControl} ${errors.econtent && styles.isInvalid}`} id="econtent" name="econtent" value={note.econtent} onChange={onChange} />
                                    {errors.econtent && <div className={styles.invalidFeedback}>{errors.econtent}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className={styles.formLabel}>Tag:</label>
                                    <input type="text" className={`${styles.formControl} ${errors.econtent && styles.isInvalid}`} id="etag" name="etag" value={note.etag} onChange={onChange} />
                                    {errors.tag && <div className={styles.invalidFeedback}>{errors.tag}</div>}
                                </div>
                            </form>
                        </div>
                        <div className={`modal-footer ${styles.modalFooter}`}>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" data-bs-dismiss='modal' className={`btn ${styles.btnPrimary}`}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`row container ${styles.row}`}>
                <h2 className={styles.noteTitle}>Your Notes</h2>
                <div className={styles.notesContainer}>
                    {notes.length === 0 && <h5 className={styles.noNotes}>No notes to display</h5>}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNoteItem} note={note} />;
                })}
            </div>
        </>
    );
};

export default Notes;

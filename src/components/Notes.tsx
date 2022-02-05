import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, GET_USER_NOTES } from "../queries/notes.query";
import { v4 as uuidv4 } from 'uuid';
import NoteItem from "./NoteItem";
import CreateNote from "./CreateNote";

const NotesList = ({userUid}) => {
    const noteInputDefaultValue = {
        title: '', summary: '', id: ''
    };
    const [notes, setNotes] = useState([]);
    const [noteInput, setNoteInput] = useState(noteInputDefaultValue);
    const [modalOpen, setModalOpen] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const [openEdit, setOpenEdit] = useState(false);
    
    const { loading, error, data } = useQuery(GET_USER_NOTES, {variables: {user_id: userUid}});
    
    const updateCache = (cache: any, { data }) => {
        const existingNotes = cache.readQuery({
          query: GET_USER_NOTES,
          variables: {
            user_id: userUid
          }
        });
        
        const newNote = data.insert_notes.returning[0];
        cache.writeQuery({
          query: GET_USER_NOTES,
          variables: {
            user_id: userUid
          },
          data: { notes: [newNote, ...existingNotes.notes] }
        });
    };
    
    const resetInput = () => {
        setNoteInput(noteInputDefaultValue);
    };

    const [addNotes] = useMutation(CREATE_NOTE, {
        update: updateCache,
        onCompleted: resetInput
    });
    const [deleteNote] = useMutation(DELETE_NOTE);
    const [updateNote] = useMutation(UPDATE_NOTE);

    useEffect(() => {
        if(!error && !loading)
            setNotes(data.notes);
    }, [data, error, loading]);

      
    // Create Notes
    const handleCreateNote = () => {
        try {
            addNotes({
                variables: { 
                    title: noteInput.title, 
                    summary: noteInput.summary, 
                    id: uuidv4(), 
                    created_at: new Date(), 
                    user_id: userUid
                } 
            });
            resetForm();
        } catch (error) {
            console.log(error);
        }
    };
    
    // Update Note
    const handleUpdateNote = ({id, summary, title}) => {
        try {
            
            updateNote({
                variables: {id, summary, title },
                optimisticResponse: true,
                update: (cache) => {
                    const existingNotes: any = cache.readQuery({ 
                        query: GET_USER_NOTES, 
                        variables: {
                            user_id: userUid
                        }
                    });
                    const newNotes = existingNotes.notes.map(note => {
                        if (note.id === id) {
                            return {...note, title, summary};
                        } else {
                            return note;
                        }
                    });
                    cache.writeQuery({
                        query: GET_USER_NOTES,
                        variables: {
                            user_id: userUid
                        },
                        data: {notes: newNotes}
                    });
                }
            });
            resetForm();
        } catch(err) {
            console.log(err);
        }
    };
    
    // Delete Notes
    const handleDelete = (id) => {
        if(window.confirm("Please confirm delete")) {
            deleteNote({
                variables: {id},
                optimisticResponse: true,
                update: (cache) => {
                    const existingNotes: any = cache.readQuery({ 
                        query: GET_USER_NOTES,
                        variables: {
                            user_id: userUid
                        }
                    });
                    const newNotes = existingNotes.notes.filter(note => note.id !== id);
                    cache.writeQuery({
                        query: GET_USER_NOTES,
                        variables: {
                            user_id: userUid
                        },
                        data: {notes: newNotes}
                    });
                }
            });
           resetForm();
        }
    };

    const resetForm = () => {
        setModalOpen(false);
        setNoteInput(noteInputDefaultValue)
        setIsCreate(true);
        setOpenEdit(false);
    };
    
    const handleEditNote = ({title, summary, id}) => {
        setNoteInput({title, summary, id });
        setIsCreate(false);
        setModalOpen(true);
    };

    if(loading) {
        return <>
            <div className="min-h-screen flex justify-center items-center">
                <div className="loader bg-white p-5 rounded-full flex space-x-3">
                    <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
                    <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
                    <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
                </div>
            </div>
        </>
    }
    return (
        <>
            <div className="container mt-5 mx-auto px-2">
                <div className="grid grid-cols-4 gap-4">
                    {notes?.map((note, i) => {
                        return <NoteItem 
                                    key={i} 
                                    note={note}
                                    handleEditNote={handleEditNote}
                                />
                    })}
                    <CreateNote 
                        noteInput={noteInput} 
                        setNoteInput={setNoteInput} 
                        handleCreateNote={handleCreateNote}
                        handleUpdateNote={handleUpdateNote}
                        handleDelete={handleDelete}
                        modalOpen={modalOpen} 
                        setModalOpen={setModalOpen}
                        resetForm={resetForm}
                        openEdit={openEdit}
                        setOpenEdit={setOpenEdit}
                        isCreate={isCreate}
                    />
                </div>
            </div>
            <div>
            </div>
        </>
    )

};

export default NotesList;
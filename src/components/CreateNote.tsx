
const CreateNote = ({noteInput, setNoteInput, handleCreateNote, handleUpdateNote, handleDelete, modalOpen, setModalOpen, resetForm, openEdit, setOpenEdit, isCreate = true}) => {
    

    const toggleShowModal = () => {
        setModalOpen(!modalOpen);
    }

    const editNote = () => {
        setOpenEdit(true);
    }

    const handleSubmit = () => {
        if(isCreate) {
            handleCreateNote();
            
        } else {
            if(!openEdit) {
                editNote();
            } else {
                handleUpdateNote(noteInput);
            }
        }
    };

    return (
        <>
        {
            !modalOpen ? 
            <div onClick={toggleShowModal} className="flex-1 text-gray-700 text-center bg-gray-400 px-5 py-5 m-2 rounded cursor-pointer">
                <div className="lg:items-center">
                    <div className="mt-4 lg:mt-0">
                        <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
                            Create New Note
                        </div>
                        <p className="block mt-1 text-xl leading-tight font-semibold text-gray-900" >
                            +
                        </p>
                    </div>
                </div>
            </div>
            :
            <div className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center" >
                <div className="bg-gray-200 h-2/4 w-8/12  py-4 px-4 rounded shadow-xl text-gray-800">
                    <div className="flex justify-between items-center">
                        <span className=""></span>
                        <svg onClick={resetForm} className="h-6 w-6 cursor-pointer p-1 hover:bg-gray-300 rounded-full" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl text-purple-800 font-bold text-center">
                        { isCreate ? 'Create New Note': !openEdit ? noteInput.title : 'Update Note'}
                    </h3>
                    <form className="space-y-5 justify-center items-center" >
                        {
                            !openEdit && !isCreate ?
                            <div className="px-6 py-6 justify-center items-center">
                                <div className="h-48 py-2 rounded border-2 border-purple-600 overflow-scroll">
                                    <p className="text-center text-justify m-3">{noteInput.summary}</p>
                                </div>
                            </div>
                            :
                            <div>
                                <div>
                                    <label className="block mb-1">Title</label>
                                    <input type="text" className="w-full border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={noteInput.title} onChange={e => (setNoteInput({ ...noteInput, title: e.target.value}))} />
                                </div>
                                <div>
                                    <label className="block mb-1">Summary</label>
                                    <textarea rows={5}  className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"value={noteInput.summary} onChange={e => (setNoteInput({ ...noteInput, summary: e.target.value }))} />
                                </div>
                            </div>
                        }
                        <div className="mt-3 flex justify-center py-4 space-x-3">
                            {
                                !isCreate &&
                                <button type="button" onClick={() => handleDelete(noteInput.id)} className="px-3 py-1 rounded hover:bg-red-600       hover:bg-opacity-50 hover:text-red-900">
                                    Delete
                                </button>
                            }
                            <button type="button" onClick={handleSubmit} className="px-3 py-1 bg-purple-800 text-gray-200 hover:bg-purple-600 rounded">
                                {isCreate ? 'Create Note' : !openEdit ? 'Edit Note' : 'Update Note'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        }
        </>
    )
};

export default CreateNote;

const NoteItem = ({note, handleEditNote}) => {
    return (
        <>
            <div onClick={() => handleEditNote(note)} className="text-gray-700 text-center bg-gray-400 px-5 py-5 m-2 rounded cursor-pointer">
            <div className="items-center">
                <div className="mt-4 lg:mt-0">
                    <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
                        {note.title.length > 20 ? note.title.substr(0, 20) + '...' : note.title}
                    </div>
                    <p className="block mt-1 text-base leading-tight text-gray-900" >
                        {note.summary.length > 20 ? note.summary.substr(0, 20) + '...' : note.summary}
                    </p>
                </div>
            </div>
            </div>
        </>
    )
}

export default NoteItem;
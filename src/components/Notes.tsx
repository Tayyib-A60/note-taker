import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_NOTES } from "../queries/get_notes";

const NotesList = () => {
    const [notes, setNotes] = useState([{title: 'Some title'}]);

    const { loading, error, data } = useQuery(GET_NOTES);

    useEffect(() => {
        if(!error && !loading)
            setNotes(data.notes);
    }, [data, error, loading])

    return (
        <>
            <h2>My notes</h2>
            <div>
                {notes?.map((note) => {
                    return <p>{note['title']}</p>
                })}
            </div>
        </>
    )

};

export default NotesList;
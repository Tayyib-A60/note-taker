import { useState } from "react";
// import Axios  from 'axios';
import axios from "../axios";

const Subscribe = () => {

    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        try 
        {
            const { data } = await axios.post('RegxtaWebsite/subscribe', { email });

            if(data.status) {
                window.alert("Yay, you're now a subscriber");
                setEmail('');
            } else {
                window.alert(data.message);
            }
            // const { data } = await Axios.post('http://35.178.213.142:4001/api/RegxtaWebsite/subscribe', { email });

            // if(data.status) {
            //     window.alert("Yay, you're now a subscriber");
            //     setEmail('');
            // } else {
            //     window.alert(data.message);
            // }
        } catch(err) {
            console.log(err);
        }
    }

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <>
         <form className="space-y-5 justify-center items-center text-center" >
             <div>
                <label className="block mb-1">Email</label>
                <input type="email" className="w-1/4 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={email} onChange={e => handleChange(e)} />
            </div>
            <button type="button" onClick={handleSubmit} className="px-3 py-1 bg-purple-800 text-gray-200 hover:bg-purple-600 rounded">Subscribe</button>
         </form>
        </>
    );
};

export default Subscribe;
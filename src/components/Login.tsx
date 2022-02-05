import { useCallback } from "react";
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../auth/firebase'
import { GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();

const Login = ({signedIn, setLoginStatus, setUserUid}) => {
    

    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            try {
                const {user: currentUser} = await signInWithPopup(auth, provider);
                storeUserInSessionStorage(currentUser);
                setUserUid(currentUser.uid);
                setLoginStatus(true);
            } catch (error) {
                console.log(error);
            }
        }
    , []);

    const storeUserInSessionStorage = ({displayName, email, uid}) => {
        sessionStorage.setItem('currentUser', JSON.stringify({ displayName, email, uid }));
    };

    const removeUserFromSessionStorage = () => {
        sessionStorage.removeItem('currentUser');
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            setLoginStatus(false);
            removeUserFromSessionStorage();
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <nav className="flex w-full items-center justify-between flex-wrap bg-gray-900 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-bold text-teal-200 text-xl">Note Taker</span>
        </div>
        <div className="w-full block justify-self-end sm:flex sm:items-center sm:w-auto">
          {
              !signedIn ?
                <div>
                    <a
                        onClick={handleLogin}
                        href="#s"
                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0"
                    > Login
                    </a>
                </div>
                :
                <div>
                    <a
                        onClick={() => logOut()}
                        href="#s"
                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-white hover:bg-red-700 mt-4 md:mt-0"
                    > Logout
                    </a>
                </div>
          }
        </div>
      </nav>
    );
};

export default Login;

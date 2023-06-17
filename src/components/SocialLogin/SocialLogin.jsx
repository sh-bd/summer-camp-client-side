import { useContext, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';

const SocialLogin = () => {

    const [role, setRole] = useState("student");
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const { signInWGoogle,
    } = useContext(AuthContext);
    const handleGoogleSignIn = () => {
        signInWGoogle()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, role: role }
                fetch('https://summer-camp-server-sh4mim.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire({
                            position: 'top-bottom',
                            icon: 'success',
                            title: 'Successfully Login!',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        navigate(from, { replace: true });
                    })
            })
            .catch(error => console.log(error))

    }


    return (
        <div>
            <div className="divider">OR</div>
            <div className="text-center ">
                <button onClick={handleGoogleSignIn} className="btn btn-warning normal-case">
                    <FaGoogle className='m-1 ' />
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
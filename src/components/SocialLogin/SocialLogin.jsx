import { useContext, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const SocialLogin = () => {
    const [role] = useState("student");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const { signInWGoogle } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        signInWGoogle()
            .then(result => {
                const loggedInUser = result.user;
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, role: role };

                fetch('https://summer-camp-server-sh4mim.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        toast.success('Successfully logged in!');
                        navigate(from, { replace: true });
                    });
            })
            .catch(error => {
                console.log(error);
                toast.error('Google sign-in failed.');
            });
    };

    return (
        <div>
            <div className="divider text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Or</div>
            <div className="text-center">
                <button
                    onClick={handleGoogleSignIn}
                    className="btn h-12 rounded-full border border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
                >
                    <FaGoogle className='mr-2' />
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;

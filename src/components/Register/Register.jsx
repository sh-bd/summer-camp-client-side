import Lottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import reg from '../../../public/reg.json';
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
    const { registerUser, updateUserData, logOut } = useContext(AuthContext);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();
    const [role, setRole] = useState("student");
    


    useEffect(() => {
        setIsButtonDisabled(watch("password") !== watch("c_password"));
    }, [watch("password"), watch("c_password")]);

    const onSubmit = async (data) => {
        try {
            const result = await registerUser(data.email, data.password);
            const loggedUser = result.user;
            console.log(loggedUser);

            await updateUserData(data.name, data.photoURL);

            const saveUser = { name: data.name, email: data.email, role: role, image: data.photoURL };
            const response = await fetch('https://summer-camp-server-sh4mim.vercel.app/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(saveUser)
            });

            const responseData = await response.json();
            if (responseData.insertedId) {
                logOut();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid md:grid-cols-2 mx-auto">
            <Helmet>
                <title>Language School | Registration</title>
            </Helmet>
            <div>
                <h2>
                    <Lottie animationData={reg}></Lottie>
                </h2>
            </div>
            <div className="hero">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-slate-300">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Register</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name")}
                                    placeholder="Name"
                                    name="name"
                                    className="input input-bordered"
                                />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("email")}
                                    placeholder="Email"
                                    name="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("photoURL")}
                                    placeholder="Photo URL"
                                    name="photoURL"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"  {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 15,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                                })} placeholder="Password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 15 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one uppercase and one special character.</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("c_password")}
                                    placeholder="Confirm Password"
                                    name="c_password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" disabled={isButtonDisabled}>
                                    Register
                                </button>
                            </div>
                        </form>
                        <p className="my-4 text-center">
                            Already have an account?
                            <Link
                                className="text-orange-600 font-bold ps-2" to="/login">
                                Login Now
                            </Link>{" "}
                        </p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;
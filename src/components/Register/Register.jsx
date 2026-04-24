import Lottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import reg from '../../../public/reg.json';
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
    const { registerUser, updateUserData, logOut } = useContext(AuthContext);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();
    const [role] = useState("student");

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
                await logOut();
                toast.success('User created successfully.');
                reset();
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            toast.error('Could not complete registration.');
        }
    };

    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-200 sm:rounded-3xl">
            <Helmet>
                <title>Registration - Language School</title>
            </Helmet>

            <div className="grid items-center gap-8 px-5 py-8 md:grid-cols-2 md:px-8 lg:px-10 lg:py-10">
                <div>
                    <div className="mx-auto flex max-w-md items-center justify-center rounded-[2rem] bg-gradient-to-br from-amber-100 via-white to-slate-100 p-4">
                        <Lottie animationData={reg}></Lottie>
                    </div>
                </div>

                <div>
                    <div className="mx-auto max-w-xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-500">
                            Create Account
                        </p>
                        <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                            Start learning on Language School.
                        </h1>
                        <p className="mt-4 max-w-lg text-base leading-8 text-slate-600">
                            Join now to save courses, manage your dashboard, and connect with instructors.
                        </p>

                        <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-inner sm:p-6">
                            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="form-control md:col-span-2">
                                        <label className="label px-0">
                                            <span className="label-text text-sm font-semibold text-slate-700">Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register("name")}
                                            placeholder="Enter your full name"
                                            className="input input-bordered h-12 rounded-2xl border-slate-300 bg-white"
                                        />
                                    </div>

                                    <div className="form-control md:col-span-2">
                                        <label className="label px-0">
                                            <span className="label-text text-sm font-semibold text-slate-700">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            {...register("email")}
                                            placeholder="Enter your email"
                                            className="input input-bordered h-12 rounded-2xl border-slate-300 bg-white"
                                            required
                                        />
                                    </div>

                                    <div className="form-control md:col-span-2">
                                        <label className="label px-0">
                                            <span className="label-text text-sm font-semibold text-slate-700">Photo URL</span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register("photoURL")}
                                            placeholder="Paste your profile image URL"
                                            className="input input-bordered h-12 rounded-2xl border-slate-300 bg-white"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label px-0">
                                            <span className="label-text text-sm font-semibold text-slate-700">Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            {...register("password", {
                                                required: true,
                                                minLength: 6,
                                                maxLength: 15,
                                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                                            })}
                                            placeholder="Create a password"
                                            className="input input-bordered h-12 rounded-2xl border-slate-300 bg-white"
                                        />
                                        {errors.password?.type === 'required' && <p className="mt-2 text-sm text-red-600">Password is required.</p>}
                                        {errors.password?.type === 'minLength' && <p className="mt-2 text-sm text-red-600">Password must be at least 6 characters.</p>}
                                        {errors.password?.type === 'maxLength' && <p className="mt-2 text-sm text-red-600">Password must be less than 15 characters.</p>}
                                        {errors.password?.type === 'pattern' && <p className="mt-2 text-sm text-red-600">Include one uppercase letter and one special character.</p>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label px-0">
                                            <span className="label-text text-sm font-semibold text-slate-700">Confirm Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            {...register("c_password")}
                                            placeholder="Confirm password"
                                            className="input input-bordered h-12 rounded-2xl border-slate-300 bg-white"
                                            required
                                        />
                                        {watch("password") !== watch("c_password") && watch("c_password") && (
                                            <p className="mt-2 text-sm text-red-600">Passwords do not match.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="form-control pt-2">
                                    <button
                                        className="btn h-12 rounded-full border-0 bg-slate-900 text-white hover:bg-slate-800"
                                        disabled={isButtonDisabled}
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>

                            <p className="mt-5 text-center text-sm text-slate-600">
                                Already have an account?
                                <Link className="pl-2 font-semibold text-amber-600 hover:text-amber-500" to="/login">
                                    Login now
                                </Link>
                            </p>

                            <div className="mt-5">
                                <SocialLogin />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={1800} />
        </section>
    );
};

export default Register;

import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import login from '../../../public/121421-login.json';
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
    const [error, setError] = useState('');
    const { signIn } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const onSubmit = (data) => {
        setError('');

        signIn(data.email, data.password)
            .then(() => {
                toast.success('Welcome back!');
                navigate(from, { replace: true });
            })
            .catch(() => {
                setError('Email and password do not match.');
            });
    };

    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-200 sm:rounded-3xl">
            <Helmet>
                <title>Login - Language School</title>
            </Helmet>

            <div className="grid items-center gap-8 px-5 py-8 md:grid-cols-2 md:px-8 lg:px-10 lg:py-10">
                <div className="order-2 md:order-1">
                    <div className="mx-auto max-w-xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-500">
                            Welcome Back
                        </p>
                        <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                            Continue your language journey.
                        </h1>
                        <p className="mt-4 max-w-lg text-base leading-8 text-slate-600">
                            Sign in to access your courses, saved selections, and dashboard tools in one place.
                        </p>

                        <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-inner sm:p-6">
                            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
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

                                <div className="form-control">
                                    <label className="label px-0">
                                        <span className="label-text text-sm font-semibold text-slate-700">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        {...register("password")}
                                        placeholder="Enter your password"
                                        className="input input-bordered h-12 rounded-2xl border-slate-300 bg-white"
                                        required
                                    />
                                </div>

                                {error && (
                                    <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                        {error}
                                    </p>
                                )}

                                <div className="form-control pt-2">
                                    <button className="btn h-12 rounded-full border-0 bg-slate-900 text-white hover:bg-slate-800">
                                        Login
                                    </button>
                                </div>
                            </form>

                            <p className="mt-5 text-center text-sm text-slate-600">
                                New to this site?
                                <Link className="pl-2 font-semibold text-amber-600 hover:text-amber-500" to="/register">
                                    Register now
                                </Link>
                            </p>

                            <div className="mt-5">
                                <SocialLogin />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="order-1 md:order-2">
                    <div className="mx-auto flex max-w-md items-center justify-center rounded-[2rem] bg-gradient-to-br from-amber-100 via-white to-slate-100 p-4">
                        <Lottie animationData={login}></Lottie>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={1800} />
        </section>
    );
};

export default Login;

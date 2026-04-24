import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaArrowRight, FaHeart } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import useAdmin from '../../hooks/useAdmin';
import useAuth from '../../hooks/useAuth';
import useInstructor from '../../hooks/useInstructor';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import Loader from '../Loader/Loader';
import SectionTitle from '../SectionTitle/SectionTitle';

const ApprovedClass = () => {
    const { loading, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const token = localStorage.getItem('access-token');

    const { data: approvedClass = [], refetch } = useQuery(['approvedClass'], async () => {
        const res = await axios.get('https://summer-camp-server-sh4mim.vercel.app/approvedClass', {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        return res.data;
    });

    if (loading) {
        return <Loader></Loader>;
    }

    const handleFavoriteButton = () => {
        toast("Added to favorites!");
    };

    const closeLoginPrompt = () => {
        setShowLoginPrompt(false);
    };

    const handleLoginRedirect = () => {
        setShowLoginPrompt(false);
        navigate('/login', { state: { from: location } });
    };

    const handelEnroll = item => {
        if (user && user.email) {
            const cartItem = {
                classId: item._id,
                class_name: item.class_name,
                instructor_name: item.instructor_name,
                image: item.image,
                email: user.email,
                price: item.price,
                seat: item.seat,
                ins_email: item.email,
                enClass: item.enClass
            };

            fetch('https://summer-camp-server-sh4mim.vercel.app/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch();
                        toast.success('You have added the course successfully!');
                    }
                })
                .catch(() => {
                    toast.error("You can't select the same class twice.");
                });
        } else {
            setShowLoginPrompt(true);
        }
    };

    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:rounded-3xl sm:p-6 lg:p-8">
            <Helmet>
                <title>Courses - Language School</title>
            </Helmet>

            <SectionTitle heading='All Courses' />

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                {approvedClass.map((item) => (
                    <div
                        key={item._id}
                        className={`card overflow-hidden rounded-2xl border shadow-xl ${
                            item.seat === 0
                                ? 'border-red-200 bg-red-50'
                                : 'border-slate-200 bg-white'
                        }`}
                    >
                        <figure className="bg-slate-100">
                            <img className='h-56 w-full object-cover' src={item.image} alt={item.class_name} />
                        </figure>
                        <div className="card-body gap-3">
                            <h2 className="card-title text-slate-900">{item.class_name}</h2>
                            <p className='text-slate-700'><span className='font-semibold text-amber-600'>Instructor:</span> {item.instructor_name}</p>
                            <p className='text-slate-700'><span className='font-semibold text-amber-600'>Seat Available:</span> {item.seat}</p>
                            <p className='text-slate-700'><span className='font-semibold text-amber-600'>Price:</span> ${item.price}</p>
                            <div className="card-actions mt-2 justify-between">
                                <button
                                    onClick={handleFavoriteButton}
                                    className="btn btn-outline btn-warning"
                                >
                                    <FaHeart />
                                </button>
                                <button
                                    onClick={() => handelEnroll(item)}
                                    className="btn btn-warning"
                                    disabled={item.seat === 0 || isAdmin || isInstructor}
                                >
                                    Select
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmDialog
                isOpen={showLoginPrompt}
                title="Login required"
                message="You need to log in before selecting a class."
                confirmLabel="Login Now"
                cancelLabel="Maybe Later"
                onConfirm={handleLoginRedirect}
                onClose={closeLoginPrompt}
            />

            <ToastContainer position="top-right" autoClose={1800} />
        </div>
    );
};

export default ApprovedClass;

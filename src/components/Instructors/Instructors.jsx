import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader/Loader';
import SectionTitle from '../SectionTitle/SectionTitle';

const Instructors = () => {
    const { loading } = useAuth();

    const handleFavoriteButton = () => {
        toast("Added to favorites!");
    };

    const token = localStorage.getItem('access-token');

    const { data: instructors = [] } = useQuery(['instructors'], async () => {
        const res = await axios.get('https://summer-camp-server-sh4mim.vercel.app/instructors', {
            headers: {
                authorization: `bearer ${token}`
            }
        });
        return res.data;
    });

    if (loading) {
        return <Loader></Loader>;
    }

    return (
        <div className='rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:rounded-3xl sm:p-6 lg:p-8'>
            <Helmet>
                <title>Instructors - Language School</title>
            </Helmet>

            <SectionTitle heading='Instructors' />

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
                <table className="table table-zebra w-full min-w-[700px]">
                    <thead>
                        <tr className='bg-slate-100 text-slate-800'>
                            <th className='text-center font-bold'>Serial</th>
                            <th className='text-center font-bold'>Image</th>
                            <th className='text-center font-bold'>Name</th>
                            <th className='text-center font-bold'>Email</th>
                            <th className='text-center font-bold'>Favorite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instructors.map((instructor, index) => (
                            <tr key={instructor._id}>
                                <th className='text-center text-slate-700'>{index + 1}</th>
                                <td className='text-center'>
                                    <div className='avatar'>
                                        <div className='rounded-xl w-20 sm:w-24'>
                                            <img src={instructor.image} alt={instructor.name} />
                                        </div>
                                    </div>
                                </td>
                                <td className='text-center font-semibold text-slate-800'>{instructor.name}</td>
                                <td className='text-center text-slate-600'>{instructor.email}</td>
                                <td className='text-center'>
                                    <button
                                        onClick={handleFavoriteButton}
                                        className='btn btn-outline btn-warning'
                                    >
                                        <FaHeart />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Instructors;

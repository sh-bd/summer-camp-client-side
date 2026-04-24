import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SectionTitle from '../../../SectionTitle/SectionTitle';


const ManageClass = () => {
    const token = localStorage.getItem('access-token');
    const modalRef = useRef(null);
    const [feedback, setFeedback] = useState('');
    const [selectedItemId, setSelectedItemId] = useState(null);

    const { data: cart = [], refetch } = useQuery(['class'], async () => {
        const res = await axios.get('https://summer-camp-server-sh4mim.vercel.app/class', {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        return res.data;
    });


    const handleCloseModal = () => {
        setFeedback('');
        setSelectedItemId(null);
        modalRef.current.close();
    };

    const handleOpenModal = (item) => {
        setFeedback(item.feedback);
        setSelectedItemId(item._id);
        modalRef.current.showModal();
    };

    const handleUpdateFeedback = async () => {
        try {
            const res = await axios.patch(
                `https://summer-camp-server-sh4mim.vercel.app/users/feedback/${selectedItemId}`,
                { feedback }
            );
            if (res.data.modifiedCount) {
                refetch();
                handleCloseModal();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Feedback send successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handelApproved = (item) => {
        fetch(`https://summer-camp-server-sh4mim.vercel.app/users/status/${item._id}`, {
            method: 'PATCH',

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Approved this Class!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handelDenied = (item) => {
        fetch(`https://summer-camp-server-sh4mim.vercel.app/users/denied/${item._id}`, {
            method: 'PATCH',

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Denied this Class!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    return (
        <div className='w-full h-full'>
            <Helmet>
                <title>Manage Courses - Language School</title>
            </Helmet>
            <div className="w-full">
                <SectionTitle heading='Manage Courses' />
                <div className='overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xl'>
                    <Fade>
                    <table className="table table-zebra w-full min-w-[900px]">
                        <thead>
                            <tr className='bg-slate-400 text-slate-800'>
                                <th className="text-center">Serial</th>
                                <th className="text-center">Photo</th>
                                <th className="text-center">Class Name</th>
                                <th className="text-center">Instructor Name</th>
                                <th className="text-center">Instructor Email</th>
                                <th className="text-center">Seat</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                cart.map((item, index) => (

                                    <tr key={item._id} className="font-bold">
                                        <td className="rounded-lg text-center">{index + 1}</td>
                                        <td className="text-center">
                                            <div className="avatar">
                                                <div className="rounded w-24">
                                                    {item.image && <img src={item.image} alt="" />}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center ">{item.class_name}</td>
                                        <td className="text-center">{item.instructor_name}</td>
                                        <td className="text-center">{item.email}</td>
                                        <td className="text-center">{item.seat}</td>
                                        <td className="text-center">{'$' + item.price}</td>
                                        <td className="text-center">
                                            <button className="btn btn-sm">{item.status}</button>
                                        </td>
                                        <td className="text-center gap-2 flex flex-col">
                                            <button
                                                onClick={() => handelApproved(item)}
                                                disabled={item.status === 'approved' || item.status === 'denied'}
                                                className="text-center btn btn-success">Approve</button>

                                            <button
                                                onClick={() => handelDenied(item)}
                                                disabled={item.status === 'approved' || item.status === 'denied'}
                                                className="text-center btn bg-red-400 text-white">Deny</button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    </Fade>
                    
                </div>
            </div>
            <dialog className="modal modal-bottom sm:modal-middle" ref={modalRef}>
                <div className="modal-box max-w-xl rounded-3xl border border-slate-200 bg-white p-0 shadow-2xl">
                    <div className="border-b border-slate-200 px-6 py-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500">
                            Admin Feedback
                        </p>
                        <h3 className="mt-2 text-2xl font-bold text-slate-900">Send feedback</h3>
                        <p className="mt-2 text-sm text-slate-500">
                            Share clear guidance for the instructor so they can improve the class submission.
                        </p>
                    </div>

                    <div className="px-6 py-5">
                        <textarea
                            className="textarea min-h-[180px] w-full rounded-2xl border-slate-300 bg-slate-50 text-slate-800 focus:border-amber-400 focus:outline-none"
                            placeholder="Write your feedback here..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            className="btn rounded-full border-0 bg-slate-200 text-slate-800 hover:bg-slate-300"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn rounded-full border-0 bg-amber-400 text-slate-950 hover:bg-amber-300"
                            onClick={handleUpdateFeedback}
                        >
                            Update Feedback
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={handleCloseModal}>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ManageClass;



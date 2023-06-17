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
                <title>Manage Classes - Language School</title>
            </Helmet>
            <div className="overflow-x-auto shadow-xl">
                <SectionTitle heading='Manage Classes' />
                <div className='overflow-x-auto m-8 card shadow-2xl'>
                    <Fade>
                    <table className="table table-zebra w-full">
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
                                <th className="text-center">Feedback</th>
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
                                        <td className="text-center">

                                            <button className="btn btn-warning" onClick={() => handleOpenModal(item)}>
                                                Send Feedback
                                            </button>
                                            <dialog id="my_modal_1" className="modal" ref={modalRef}>
                                                <form method="dialog" className="modal-box">
                                                    <h3 className="font-bold text-lg"
                                                    >Feedback</h3>
                                                    <textarea
                                                        className="textarea textarea-info"
                                                        value={feedback}
                                                        onChange={(e) => setFeedback(e.target.value)}
                                                    ></textarea>

                                                    <div className="modal-action">
                                                        <button className="btn btn-active btn-neutral" onClick={handleCloseModal}>
                                                            Close
                                                        </button>
                                                        <button className="btn btn-info" onClick={handleUpdateFeedback}>
                                                            Update
                                                        </button>
                                                    </div>
                                                </form>
                                            </dialog>

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
        </div>
    );
};

export default ManageClass;



import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import useCart from '../../../hooks/useCart';
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog';
import SectionTitle from '../../SectionTitle/SectionTitle';

const MySelectedClass = () => {
    const [cart, refetch] = useCart();
    const [selectedId, setSelectedId] = useState(null);

    const openDeleteDialog = (_id) => {
        setSelectedId(_id);
    };

    const closeDeleteDialog = () => {
        setSelectedId(null);
    };

    const handelDeleteClass = () => {
        if (!selectedId) {
            return;
        }

        fetch(`https://summer-camp-server-sh4mim.vercel.app/carts/${selectedId}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success('The class has been deleted.');
                }
                closeDeleteDialog();
            })
            .catch((error) => {
                console.error(error);
                toast.error('Something went wrong while deleting the class.');
                closeDeleteDialog();
            });
    };

    const handelPayment = () => {
        // console.log(id);
    };

    return (
        <div className='w-full space-y-5'>
            <Helmet>
                <title>Selected Courses - Language School</title>
            </Helmet>
            <SectionTitle heading='Selected Courses' />
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
                <Fade>
                    <table className="table table-zebra w-full min-w-[860px]">
                        <thead>
                            <tr className='bg-slate-400 text-slate-800'>
                                <th className='text-center'>Serial</th>
                                <th className='text-center'>Photo</th>
                                <th className='text-center'>Course Name</th>
                                <th className='text-center'>Instructor Name</th>
                                <th className='text-center'>Instructor Email</th>
                                <th className='text-center'>Seat</th>
                                <th className='text-center'>Price</th>
                                <th className='text-center'>Payment</th>
                                <th className='text-center'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
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
                                    <td className="text-center">{item.ins_email}</td>
                                    <td className="text-center">{item.seat}</td>
                                    <td className="text-center">{'$' + item.price}</td>
                                    <td className="text-center">
                                        <Link to={`/dashboard/student/payment/${item._id}`}>
                                            <button
                                                onClick={() => handelPayment(item._id)}
                                                className="text-center btn btn-warning"
                                            >
                                                Pay
                                            </button>
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => openDeleteDialog(item._id)}
                                            className="text-center btn btn-error"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Fade>
            </div>

            <ConfirmDialog
                isOpen={Boolean(selectedId)}
                title="Delete this class?"
                message="This selected class will be removed from your list and you won't be able to undo it."
                confirmLabel="Yes, Delete It"
                cancelLabel="Keep It"
                onConfirm={handelDeleteClass}
                onClose={closeDeleteDialog}
            />

            <ToastContainer position="top-right" autoClose={1800} />
        </div>
    );
};

export default MySelectedClass;

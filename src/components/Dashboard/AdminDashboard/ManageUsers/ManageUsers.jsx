import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import SectionTitle from '../../../SectionTitle/SectionTitle';


const ManageUsers = () => {

    const { logOut } = useAuth();
    const navigate = useNavigate();

    const token = localStorage.getItem('access-token');

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        try {
            const res = await axios.get('https://summer-camp-server-sh4mim.vercel.app/users', {
                headers: {
                    authorization: `bearer ${token}`
                }
            });
            return res.data;
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                await logOut();
                navigate('/login');
            }
            throw error;
        }
    });


    const handelMakeInstructor = (user) => {
        fetch(`https://summer-camp-server-sh4mim.vercel.app/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Instructor Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handelMakeAdmin = (user) => {
        fetch(`https://summer-camp-server-sh4mim.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    return (
        <div className='w-full h-full'>
            <Helmet>
                <title>Camp Arena | Manage Users</title>
            </Helmet>
            <div className="overflow-x-auto">
                <SectionTitle heading='Manage Users' />
                <div className="overflow-x-auto m-8 card shadow-2xl">
                    <Fade>
                        <table className="table table-zebra w-full">
                            {/* head */}
                            <thead>
                                <tr className='bg-slate-400 text-slate-800'>
                                    <th className='text-center'>Serial</th>
                                    <th className='text-center'>Name</th>
                                    <th className='text-center'>Email</th>
                                    <th className='text-center'>Role</th>
                                    <th className='text-center'>Instructor</th>
                                    <th className='text-center'>Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) =>
                                        <tr key={user._id} className='font-bold'>
                                            <th className="text-center">{index + 1}</th>
                                            <td className="text-center">{user.name}</td>
                                            <td className="text-center">{user.email}</td>
                                            <td className="text-center">{user.role}</td>
                                            <td className="text-center"><button
                                                onClick={() => handelMakeInstructor(user)}
                                                disabled={user.role === 'instructor'}
                                                className="btn btn-success">Set as Instructor</button></td>
                                            <td className='text-center '><button
                                                onClick={() => handelMakeAdmin(user)}
                                                disabled={user.role === 'admin'}
                                                className="btn bg-red-400">Set as Admin</button></td>
                                        </tr>)
                                }

                            </tbody>
                        </table>
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;


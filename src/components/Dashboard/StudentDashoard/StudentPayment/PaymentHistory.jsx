import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../../hooks/useAuth';
import SectionTitle from '../../../SectionTitle/SectionTitle';


const PaymentHistory = () => {

    const { user, loading } = useAuth();

    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = () => {
        const url = `https://summer-camp-server-sh4mim.vercel.app/payments?email=${user?.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCart(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error retrieving data:', error);
            });
    };

    return (
        <div className='w-full space-y-5'>
            <Helmet>
                <title>Payment History - Language School</title>
            </Helmet>
            <SectionTitle heading='payment History' />
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
                <Fade>
                    <table className="table table-zebra w-full min-w-[760px]">
                        <thead className='m-5'>
                            <tr className='bg-slate-400 text-black rounded-2xl'>
                                <th className='text-center'>Serial</th>
                                <th className='text-center'>Course Name</th>
                                <th className='text-center'>Price</th>
                                <th className='text-center'>Status</th>
                                <th className='text-center'>Transaction ID</th>
                                <th className='text-center'>Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                cart.map((item, index) => (

                                    <tr key={item._id} className="font-bold">
                                        <td className="rounded-lg text-center">{index + 1}</td>
                                        <td className="text-center">{item.class_name}</td>
                                        <td className="text-center">{'$' + item.price}</td>
                                        <td className="text-center">{item.status}</td>
                                        <td className="text-center">{item.transactionId}</td>
                                        <td className="text-center">{item.date}</td>

                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </Fade>
            </div>
        </div>
    );
};

export default PaymentHistory;

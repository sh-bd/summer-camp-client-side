import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Marquee from "react-fast-marquee";
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader/Loader';
import SectionTitle from '../SectionTitle/SectionTitle';






const PopularInstructor = () => {
    const { loading } = useAuth();

    const handleFavoriteButton = () => {
        toast("Added to favorites!");
    };



    const token = localStorage.getItem('access-token');

    const { data: instructors = [], refetch } = useQuery(['instructors'], async () => {
        const res = await axios.get('https://summer-camp-server-sh4mim.vercel.app/topInstructors', {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        return res.data;
    });

    if (loading) {
        return <Loader></Loader>
    }





    return (
        <div>
            <div className="text-center text-3xl font-bold mb-5">
                <SectionTitle heading='Popular Instructors' />
            </div>
            <Marquee>
                <div className="overflow-x-auto shadow-lg rounded-xl bg-slate-100">
                    <div className='flex gap-10 p-5'>
                        {
                            instructors.map((item) => (
                                <div
                                    key={item._id}
                                    className='card w-full bg-base-100 shadow-xl'>
                                    <figure>
                                        <img className='h-52 w-full' src={item.image} alt={item.class_name} />
                                    </figure>
                                    <div className="card-body font-bold">
                                        <p><span className='text-red-600'>Name: </span>{item.name}</p>
                                        <p><span className='text-red-600'>Email :</span> {item.email}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Marquee>
        </div>
    );
};

export default PopularInstructor;


import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { FaArrowRight, FaHeart } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAdmin from '../../hooks/useAdmin';
import useAuth from '../../hooks/useAuth';
import useInstructor from '../../hooks/useInstructor';
import Loader from '../Loader/Loader';
import SectionTitle from '../SectionTitle/SectionTitle';




const ApprovedClass = () => {
    const { loading, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();


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
        return <Loader></Loader>
    }

    const handleFavoriteButton = () => {
        toast("Added to favorites!");
    };

    const handelEnroll = item => {

        console.log(item);

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
            }

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
                        // setEnrolledClasses([...enrolledClasses, cartItem]);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'You have added the class Successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
                .catch(error=>{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: "You Can't select a Single class Twice!",
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        }
        else {
            Swal.fire({
                title: 'You have to login first!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }

    }


    return (
        <div className="overflow-x-auto shadow-lg rounded-xl bg-slate-100">
            <Helmet>
                <title>Camp Arena | Class</title>
            </Helmet>
            <SectionTitle heading='All Classes' />
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-10 p-5'>
                {
                    approvedClass.map((item) => (
                        <div
                            key={item._id}
                            className={`card w-full bg-base-100 shadow-xl ${item.seat === 0 ? 'bg-red-200' : ''}`}>
                            <figure>
                                <img className='h-52 w-full' src={item.image} alt={item.class_name} />
                            </figure>
                            <div className="card-body font-bold">
                                <h2 className="card-title">{item.class_name}</h2>
                                <p><span className='text-red-600'>Instructor:</span> {item.instructor_name}</p>
                                <p><span className='text-red-600'>Seat Available:</span> {item.seat}</p>
                                <p><span className='text-red-600'>Price:</span> ${item.price}</p>
                                <div className="card-actions justify-between">
                                    <button
                                        onClick={handleFavoriteButton}
                                        className="btn btn-info"><FaHeart /></button>
                                    <button
                                        onClick={() => handelEnroll(item)}
                                        className="btn btn-info"
                                        disabled={item.seat === 0 || isAdmin || isInstructor }
                                    >Select<FaArrowRight /></button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <ToastContainer />

        </div>
    );
};

export default ApprovedClass;

// enrolledClasses.some((enrolledClass) => enrolledClass.classId === item._id)



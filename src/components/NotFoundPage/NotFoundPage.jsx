import Lottie from "lottie-react";
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import errorPage from '../../../public/errorPage.json';


const NotFoundPage = () => {
    return (
        <div className='flex justify-center items-center'>
            <div>
                <Lottie className='mt-10 ' animationData={errorPage}></Lottie>
                <div className='flex flex-col gap-5 items-center'>
                    <h2 className='text-center font-bold text-red-600 text-4xl mt-3'>Error 404 <br /> Page Not Found!</h2>
                    <div>
                        <Link to='/'><button className='btn btn-warning text-white  gap-2'><FaArrowLeft /> Back To Home</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
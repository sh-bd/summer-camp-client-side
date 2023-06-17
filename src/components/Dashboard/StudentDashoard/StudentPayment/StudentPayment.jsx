import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import SectionTitle from '../../../SectionTitle/SectionTitle';
import PaymentCheckoutForm from './PaymentChekOutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const StudentPayment = () => {

    const loadedData = useLoaderData();
    console.log(loadedData);
    const price = parseFloat(loadedData.price.toFixed(2));


    return (
        <div className='w-full h-full'>
            <Helmet>
                <title>Language School | Payment</title>
            </Helmet>
            <SectionTitle subHeading='Please pay for your selected class' heading='Payment' />
            <div className='bg-base-100 p-8 m-8 card shadow-2xl '>
                <Elements stripe={stripePromise}>
                    <PaymentCheckoutForm price={price} loadedData={loadedData}></PaymentCheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default StudentPayment;


















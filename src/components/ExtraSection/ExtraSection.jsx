import React from 'react';
import Lottie from "lottie-react";
import g7 from "../../../public/g7.json";

const ExtraSection = () => {

    return (
        <div className='md:grid grid-cols-2 justify-center p-5 card bg-slate-100 rounded-lg'>
            <div className='m-5'>
                <div className=' lg:grid grid-rows-1 justify-center'>
                    <h4 className='text-start text-4xl font-semibold'>Explore New Languages <br /> <span className='text-red-600'>Like Never Before!</span></h4>
                    <p className='mt-3 text-start'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quaerat ut nulla iste molestiae, libero alias ratione a perspiciatis vel, nisi quo quasi minima corporis esse animi neque cupiditate? Aliquam earum doloribus eius fugiat ea adipisci, sit esse rem. Modi commodi ex non inventore rerum fugiat ducimus explicabo natus neque quos! Accusantium, cupiditate aliquam quam magni tenetur, maxime numquam nostrum eum modi natus reiciendis. Similique, tempora! Sunt quod molestias esse! Non quod ducimus nobis beatae incidunt neque ipsa deleniti quas?
                    </p>

                </div>
            </div>

            <div className='sm:mt-5 md:mt-0 lg:py-5 mx-auto'>

                <Lottie className='h-full w-80' animationData={g7}></Lottie>
            </div>
        </div>
    );
};

export default ExtraSection;
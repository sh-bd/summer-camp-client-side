import React from 'react';
import Lottie from "lottie-react";
import g7 from "../../../public/g7.json";

const ExtraSection = () => {
    return (
        <section className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-200 sm:rounded-3xl'>
            <div className='grid gap-8 px-5 py-8 md:grid-cols-2 md:px-8 lg:px-10 lg:py-10'>
                <div className='flex flex-col justify-center'>
                    <p className='text-xs font-semibold uppercase tracking-[0.28em] text-amber-500'>
                        Why Choose Us
                    </p>
                    <h2 className='mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl'>
                        Explore new languages
                        <span className='block text-amber-600'>with real momentum.</span>
                    </h2>
                    <p className='mt-5 max-w-xl text-base leading-8 text-slate-600'>
                        Learn through immersive lessons, supportive instructors, and a lively class
                        environment designed to keep you speaking, practicing, and improving with confidence.
                        From your first class to advanced fluency goals, the experience stays engaging.
                    </p>

                    <div className='mt-6 grid gap-4 sm:grid-cols-2'>
                        <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                            <h3 className='text-lg font-bold text-slate-900'>Flexible Learning</h3>
                            <p className='mt-2 text-sm leading-6 text-slate-600'>
                                Choose courses that match your level, schedule, and learning goals.
                            </p>
                        </div>
                        <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                            <h3 className='text-lg font-bold text-slate-900'>Community Driven</h3>
                            <p className='mt-2 text-sm leading-6 text-slate-600'>
                                Practice with peers and instructors in a more social, motivating environment.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='relative flex items-center justify-center rounded-[2rem] bg-gradient-to-br from-amber-100 via-white to-slate-100 p-4'>
                    <div className='absolute inset-6 rounded-[2rem] border border-white/70'></div>
                    <Lottie className='relative h-full w-full max-w-md' animationData={g7}></Lottie>
                </div>
            </div>
        </section>
    );
};

export default ExtraSection;

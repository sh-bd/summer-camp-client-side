import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Marquee from "react-fast-marquee";
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader/Loader';
import SectionTitle from '../SectionTitle/SectionTitle';

const PopularInstructor = () => {
    const { loading } = useAuth();
    const token = localStorage.getItem('access-token');

    const { data: instructors = [] } = useQuery(['instructors'], async () => {
        const res = await axios.get('https://summer-camp-server-sh4mim.vercel.app/topInstructors', {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        return res.data;
    });

    if (loading) {
        return <Loader></Loader>;
    }

    return (
        <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:rounded-3xl sm:p-6 lg:p-8">
            <div className="mb-6">
                <SectionTitle heading='Popular Instructors' />
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 px-2 py-5 sm:px-3">
                <Marquee pauseOnHover gradient={false} speed={45}>
                    <div className="flex gap-6 px-1">
                        {instructors.map((item) => (
                            <article
                                key={item._id}
                                className="w-[270px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
                            >
                                <figure className="bg-slate-100">
                                    <img className='h-56 w-full object-cover' src={item.image} alt={item.name} />
                                </figure>
                                <div className="space-y-2 p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-500">
                                        Featured Instructor
                                    </p>
                                    <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                                    <p className="text-sm text-slate-600">{item.email}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </Marquee>
            </div>
        </section>
    );
};

export default PopularInstructor;

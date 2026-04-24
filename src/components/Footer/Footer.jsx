import { Link } from "react-router-dom";
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';

const Footer = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isInstructor, isInstructorLoading] = useInstructor();

    const dashboardPath = isAdmin || isAdminLoading
        ? "/dashboard/admin/manageClass"
        : isInstructor || isInstructorLoading
            ? "/dashboard/instructor/myClass"
            : "/dashboard/student/mySelectedClass";

    return (
        <footer className="w-full border-t border-slate-800 bg-slate-950 text-slate-200">
            <div className="w-[95%] mx-auto px-4 pt-10 pb-5 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr] md:items-start">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                            Language School
                        </p>
                        <h3 className="text-2xl font-bold text-white">Keep learning from anywhere.</h3>
                        <p className="max-w-md text-sm leading-6 text-slate-400">
                            Explore courses, meet instructors, and manage your dashboard with a cleaner,
                            more consistent experience.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Navigation
                        </h4>
                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-1">
                            <Link to="/" className="transition-colors hover:text-amber-300">Home</Link>
                            <Link to="/instructors" className="transition-colors hover:text-amber-300">Instructors</Link>
                            <Link to="/courses" className="transition-colors hover:text-amber-300">Courses</Link>
                            <Link to={dashboardPath} className="transition-colors hover:text-amber-300">Dashboard</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Connect
                        </h4>
                        <div className="mt-4 flex items-center gap-4">
                            <a href="#" className="text-slate-300 transition-colors hover:text-amber-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                            </a>
                            <a href="#" className="text-slate-300 transition-colors hover:text-amber-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg>
                            </a>
                            <a href="#" className="text-slate-300 transition-colors hover:text-amber-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t border-slate-800 pt-4 text-sm text-slate-400">
                    <p>Copyright © 2023 - All rights reserved by <Link to="/" className="text-slate-200 hover:text-amber-300">Language School</Link>.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

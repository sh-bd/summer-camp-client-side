import { FaBars, FaBookmark, FaCheckCircle, FaMoneyBillAlt, FaPlus, FaSave, FaTimes, FaUsers } from 'react-icons/fa';
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Loader from "../components/Loader/Loader";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import useInstructor from "../hooks/useInstructor";

const Dashboard = () => {
    const { loading } = useAuth();

    if (loading) {
        return <Loader></Loader>;
    }

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    const dashboardLinks = isAdmin
        ? [
            {
                to: '/dashboard/admin/manageClass',
                label: 'Manage Courses',
                icon: <FaBookmark />
            },
            {
                to: '/dashboard/admin/manageUsers',
                label: 'Manage Users',
                icon: <FaUsers />
            }
        ]
        : isInstructor
            ? [
                {
                    to: '/dashboard/instructor/myClass',
                    label: 'My Courses',
                    icon: <FaSave />
                },
                {
                    to: '/dashboard/instructor/addClass',
                    label: 'Add a New Course',
                    icon: <FaPlus />
                }
            ]
            : [
                {
                    to: '/dashboard/student/mySelectedClass',
                    label: 'My Selected Courses',
                    icon: <FaCheckCircle />
                },
                {
                    to: '/dashboard/student/myEnrolledClass',
                    label: 'My Enrolled Courses',
                    icon: <FaBookmark />
                },
                {
                    to: '/dashboard/student/paymentHistory',
                    label: 'Payment History',
                    icon: <FaMoneyBillAlt />
                }
            ];

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${isActive
            ? 'bg-amber-400 text-slate-950 shadow-md'
            : 'text-slate-100 hover:bg-slate-700 hover:text-white'
        }`;

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col overflow-x-hidden">
            <Header></Header>
            <div className="drawer lg:drawer-open flex-1 overflow-x-hidden lg:min-h-full">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content min-w-0 flex flex-col lg:min-h-full">
                    <div className="w-full border-b border-slate-200 bg-white/90 backdrop-blur lg:hidden">
                        <div className="w-[95%] mx-auto flex items-center justify-between gap-3 py-4">
                            <label
                                htmlFor="my-drawer-2"
                                className="btn border-0 bg-slate-900 text-white hover:bg-slate-800 drawer-button"
                            >
                                <FaBars />
                                Menu
                            </label>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                                    Dashboard
                                </p>
                                <h2 className="text-lg font-bold text-slate-900">Manage your workspace</h2>
                            </div>
                        </div>
                    </div>

                    <main className="w-full max-w-6xl mx-auto flex-1 px-3 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-8">
                        <div className="overflow-hidden rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200 sm:rounded-3xl sm:p-6 lg:p-8">
                            <Outlet></Outlet>
                        </div>
                    </main>
                </div>

                <div className="drawer-side left-0 z-30 h-full lg:min-h-full">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <aside className="h-full min-h-full w-72 max-w-[85vw] overflow-y-auto sm:w-80 bg-slate-900 text-slate-100 shadow-2xl lg:shadow-none">
                        <div className="flex h-full flex-col">
                            <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4 lg:hidden">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                                        Dashboard
                                    </p>
                                    <h2 className="mt-1 text-lg font-bold text-white">Menu</h2>
                                </div>
                                <label
                                    htmlFor="my-drawer-2"
                                    className="btn btn-ghost btn-sm rounded-full text-slate-200 hover:bg-slate-800"
                                >
                                    <FaTimes />
                                </label>
                            </div>
                            <div className="border-b border-slate-700 px-6 py-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                                    Control Panel
                                </p>
                                <h2 className="mt-2 text-2xl font-bold text-white">Dashboard Menu</h2>
                                <p className="mt-2 text-sm text-slate-300">
                                    Quick access to your courses, users, and student activity.
                                </p>
                            </div>

                            <ul className="menu flex-1 gap-2 px-4 py-6">
                                {dashboardLinks.map((link) => (
                                    <li key={link.to}>
                                        <NavLink to={link.to} className={navLinkClass}>
                                            {link.icon}
                                            <span>{link.label}</span>
                                        </NavLink>
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Dashboard;

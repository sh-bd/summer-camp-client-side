import { useContext } from 'react';
import { FaBars, FaGraduationCap } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';
import { AuthContext } from '../../providers/AuthProvider';
import './Header.css';

const Header = () => {
    const { user, logOut, setLoading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isInstructor, isInstructorLoading] = useInstructor();

    const dashboardPath = isAdmin || isAdminLoading
        ? "/dashboard/admin/manageClass"
        : isInstructor || isInstructorLoading
            ? "/dashboard/instructor/myClass"
            : "/dashboard/student/mySelectedClass";

    const handleLogOut = () => {
        logOut()
            .then(() => setLoading(false))
            .catch((error) => {
                console.log(error);
            });
    };

    const navLinkClass = ({ isActive }) =>
        `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isActive
            ? 'bg-slate-900 text-white'
            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
        }`;

    const navItems = (
        <>
            <li><NavLink className={navLinkClass} to="/">Home</NavLink></li>
            <li><NavLink className={navLinkClass} to="/instructors">Instructors</NavLink></li>
            <li><NavLink className={navLinkClass} to="/courses">Courses</NavLink></li>
            <li><NavLink className={navLinkClass} to={dashboardPath}>Dashboard</NavLink></li>
        </>
    );

    return (
        <header className="site-header w-full border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="w-[95%] mx-auto">
                <div className="navbar min-h-[5.5rem] gap-3 px-0">
                    <div className="navbar-start gap-3">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost rounded-full lg:hidden">
                                <FaBars className="h-5 w-5" />
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content z-[1001] mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl"
                            >
                                {navItems}
                                {user?.email && (
                                    <li className="mt-2">
                                        <button
                                            onClick={handleLogOut}
                                            className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-300"
                                        >
                                            Log Out
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <Link to="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
                                <FaGraduationCap className="h-5 w-5" />
                            </div>
                            <div className="leading-tight">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-500">
                                    Summer Camp
                                </p>
                                <h1 className="text-lg font-bold text-slate-900 sm:text-2xl">
                                    Language School
                                </h1>
                            </div>
                        </Link>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal gap-2 px-1">
                            {navItems}
                        </ul>
                    </div>

                    <div className="navbar-end gap-3">
                        {user?.email ? (
                            <>
                                <div className="hidden text-right lg:block">
                                    <p className="text-sm font-semibold text-slate-900">
                                        {user?.displayName || 'User'}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Signed in
                                    </p>
                                </div>

                                <div className="tooltip tooltip-bottom" data-tip={user?.displayName || 'User'}>
                                    <div className="h-11 w-11 overflow-hidden rounded-full ring-2 ring-amber-300">
                                        <img
                                            className="h-full w-full object-cover"
                                            src={user?.photoURL || 'https://via.placeholder.com/80?text=User'}
                                            alt={user?.displayName || 'User'}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleLogOut}
                                    className="btn hidden rounded-full border-0 bg-amber-400 text-slate-950 hover:bg-amber-300 lg:inline-flex"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="btn rounded-full border-0 bg-amber-400 text-slate-950 hover:bg-amber-300">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

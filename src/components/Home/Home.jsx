import { Helmet } from 'react-helmet-async';
import useAuth from "../../hooks/useAuth";
import Banner from "../Banner/Banner";
import ExtraSection from "../ExtraSection/ExtraSection";
import Loader from "../Loader/Loader";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructor from "../PopularInstructor/PopularInstructor";

const Home = () => {
    const { loading } = useAuth();

    if (loading) {
        return <Loader></Loader>;
    }

    return (
        <div className="space-y-14 py-6 sm:space-y-16 sm:py-8">
            <Helmet>
                <title>Home - Language School</title>
            </Helmet>

            <Banner></Banner>
            <PopularClass></PopularClass>
            <PopularInstructor></PopularInstructor>
            <ExtraSection></ExtraSection>
        </div>
    );
};

export default Home;

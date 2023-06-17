
import { Helmet } from 'react-helmet-async';
import useAuth from "../../hooks/useAuth";
import Banner from "../Banner/Banner";
import ExtraSection from "../ExtraSection/ExtraSection";
import ExtraSection2 from "../ExtraSection/ExtraSection2";
import Loader from "../Loader/Loader";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructor from "../PopularInstructor/PopularInstructor";


const Home = () => {

    const { loading } = useAuth();

    if (loading) {
        return <Loader></Loader>
    }

    return (
        <>
            <Helmet>
                <title>Home - Language School</title>
            </Helmet>
            <div>
                <Banner></Banner>
            </div>
            <div className="mt-24">
                <PopularClass></PopularClass>
            </div>
            <div className="mt-14">
                <PopularInstructor></PopularInstructor>
            </div>
            <div className="mt-14">
                <ExtraSection></ExtraSection>
            </div>
            <div className="mt-14">
                <ExtraSection2></ExtraSection2>
            </div>
        </>

    );
};

export default Home;
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";


const Main = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header></Header>
            <main className='w-[95%] mx-auto flex-1'>
                <Outlet></Outlet>
            </main>
            <div className='mt-5'>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;

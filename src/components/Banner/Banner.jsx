import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import { Link } from 'react-router-dom';
import './Banner.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const slides = [
    {
        image: "https://thumbs.dreamstime.com/z/diverse-language-conversation-banner-concept-diverse-group-people-talking-different-languages-multi-cultural-team-concept-111498191.jpg",
        eyebrow: "Summer Language Camp",
        title: "Build confidence in every conversation.",
        text: "Join immersive courses, expert-led sessions, and a vibrant community that makes learning feel alive."
    },
    {
        image: "https://www.xploree.com/wp-content/uploads/2017/07/banner-8.jpg",
        eyebrow: "Modern Learning",
        title: "Explore new cultures through language.",
        text: "Practice with passionate instructors, sharpen speaking skills, and discover courses that fit your pace."
    },
    {
        image: "https://media.istockphoto.com/id/1254791418/vector/banner-with-little-peoplen-and-spanish-symbols.jpg?s=1024x1024&w=is&k=20&c=0FU6nc3ZVlwBYAZl575J3RhwxQVr87uQdTotcXqwAlQ=",
        eyebrow: "Global Community",
        title: "Learn smarter with engaging experiences.",
        text: "From beginner-friendly lessons to advanced practice, find the right course and start growing today."
    }
];

const Banner = () => {
    return (
        <section className="home-banner rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm ring-1 ring-slate-200 sm:p-4">
            <div className="banner-shell overflow-hidden rounded-[1.5rem]">
                <AutoplaySlider
                    play={true}
                    cancelOnInteraction={false}
                    interval={6500}
                    bullets={true}
                    organicArrows={true}
                >
                    {slides.map((slide) => (
                        <div key={slide.title} className="banner-slide">
                            <img src={slide.image} alt={slide.title} />
                            <div className="banner-overlay">
                                <div className="banner-copy">
                                    <p className="banner-eyebrow">{slide.eyebrow}</p>
                                    <h1>{slide.title}</h1>
                                    <p className="banner-text">{slide.text}</p>
                                    <div className="banner-actions">
                                        <Link to="/courses" className="btn rounded-full border-0 bg-amber-400 text-slate-950 hover:bg-amber-300">
                                            Explore Courses
                                        </Link>
                                        <Link to="/instructors" className="btn rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20">
                                            Meet Instructors
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </AutoplaySlider>
            </div>
        </section>
    );
};

export default Banner;

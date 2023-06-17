// import AwesomeSlider from 'react-awesome-slider';
// import withAutoplay from 'react-awesome-slider/dist/autoplay';
// import 'react-awesome-slider/dist/styles.css';
// import 'react-awesome-slider/dist/custom-animations/cube-animation.css';


// const AutoplaySlider = withAutoplay(AwesomeSlider);


// const Banner = () => {
//     return (
//         <div>

//             <AutoplaySlider
//                 animation="cubeAnimation"
//                 play={true}
//                 cancelOnInteraction={false} // should stop playing on user interaction
//                 interval={6000}
//             >
//                 <div>
//                     <img src="https://i.ibb.co/XtQyY50/pexels-juan-salamanca-61129.jpg" alt="Image 1" />
//                 </div>
//                 <div>
//                     <img src="https://i.ibb.co/s2HdjK6/group-girls-camping-forest.jpg" alt="Image 2" />
//                 </div>
//                 <div>
//                     <img src="https://i.ibb.co/9gk0BDd/25791736-7139226.jpg" alt="Image 3" />
//                 </div>
//             </AutoplaySlider>


//         </div>
//     );
// };

// export default Banner;

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';

import './Banner.css'

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Banner = () => {
    return (
        <div>
            <AutoplaySlider
                animation="cubeAnimation"
                play={false}
                cancelOnInteraction={false} // should stop playing on user interaction
                interval={5000}
            >
                <div>
                    <img
                        src="https://thumbs.dreamstime.com/z/diverse-language-conversation-banner-concept-diverse-group-people-talking-different-languages-multi-cultural-team-concept-111498191.jpg"
                        alt="Image 3"
                    />
                </div>
                
                <div>
                    <img
                        src="https://www.xploree.com/wp-content/uploads/2017/07/banner-8.jpg"
                        alt="Image 2"
                    />
                </div>


                <div>
                    <img
                        src="https://media.istockphoto.com/id/1254791418/vector/banner-with-little-peoplen-and-spanish-symbols.jpg?s=1024x1024&w=is&k=20&c=0FU6nc3ZVlwBYAZl575J3RhwxQVr87uQdTotcXqwAlQ="
                        alt="Image 2"
                    />
                </div>
                


            </AutoplaySlider>
        </div>
    );
};

export default Banner;

import React from 'react'
import heroImg4 from '../../assets/heroImg6.png'

const Slider = () => {
    return (
        <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 py-16 px-6 md:px-20">
            <div className="flex flex-col-reverse md:flex-row items-center gap-10 my-20">

                <div className="md:w-1/2 text-center md:text-left animate-fadeIn">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
                        Welcome to <span className="text-blue-600">MyHealthcare</span>
                    </h1>
                    <p className="text-blue-800 text-lg leading-relaxed mb-8">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa obcaecati neque dolore
                        beatae eaque dicta, deleniti quia eius quidem, laboriosam saepe commodi similique
                        quae repellat aliquam illo sit? Fugit, magnam.
                    </p>

                    <div className="flex justify-center md:justify-start gap-4">
                        <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                            Get Started
                        </button>
                        <button className="border-2 border-blue-600 text-blue-700 font-semibold py-3 px-6 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300">
                            Learn More
                        </button>
                    </div>
                </div>

                <div className="md:w-1/2 flex justify-center animate-slideIn">
                    <img
                        src={heroImg4}
                        alt="Healthcare"
                        className="w-120 md:w-120 rounded-3xl hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </div>
        </div>
    )
}

export default Slider

import React from 'react'
import DefaultBtn from '../../components/Buttons/DefultBtn';

const NEWS = () => {
    const newsItems = [
        {
            id: 1,
            image: 'https://wallpapercave.com/wp/wp14189914.jpg',
            title: 'Main News Title',
            description: 'This is a detailed description of the main news article. It gives more context and attracts users to read more.',
            date: 'July 2, 2025'
        },
        {
            id: 2,
            image: 'https://wallpapercave.com/wp/wp14189962.jpg',
            title: 'News Title 2',
            description: 'Short desc for news 2.',
            date: 'July 1, 2025'
        },
        {
            id: 3,
            image: 'https://wallpapercave.com/wp/wp14189984.jpg',
            title: 'News Title 3',
            description: 'Short desc for news 3.',
            date: 'June 30, 2025'
        },
        {
            id: 4,
            image: 'https://wallpapercave.com/wp/wp14189980.jpg',
            title: 'News Title 4',
            description: 'Short desc for news 4.',
            date: 'June 29, 2025'
        },
        {
            id: 5,
            image: 'https://wallpapercave.com/wp/wp14189973.jpg',
            title: 'News Title 5',
            description: 'Short desc for news 5.',
            date: 'June 28, 2025'
        },
    ];

    return (
        <div className='bg-white py-20 px-4 xl:px-32'>
            <h1 className="text-blue-700 text-3xl font-bold uppercase text-center mb-12">NEWS</h1>
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left side - Main News */}
                <div className="flex-1">
                    <img src={newsItems[0].image} alt={newsItems[0].title} className="w-full h-80 object-cover rounded-xl mb-6" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">{newsItems[0].title}</h2>
                    <p className="text-gray-600 mb-4">{newsItems[0].description}</p>
                    <span className="text-sm text-gray-500">{newsItems[0].date}</span>
                </div>

                {/* Right side - Side News */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6">
                    {newsItems.slice(1, 5).map(news => (
                        <div key={news.id} className="flex gap-4 bg-gray-50 rounded-xl p-3 hover:shadow-lg transition">
                            <img src={news.image} alt={news.title} className="w-28 h-20 object-cover rounded-md" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{news.title}</h3>
                                <p className="text-gray-600 text-sm mb-1">{news.description}</p>
                                <span className="text-xs text-gray-500">{news.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <center className='mt-8'>
                <a href="/news">
                    <DefaultBtn
                        label='View More NEWS'
                        type='button'
                    />
                </a>
            </center>
        </div>
    )
}

export default NEWS

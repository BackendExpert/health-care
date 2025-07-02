import React, { useState } from 'react';

const NEWS = () => {
    const newsList = [
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

    const [search, setSearch] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [viewNews, setViewNews] = useState(null);

    const filteredNews = newsList.filter(
        n =>
            n.title.toLowerCase().includes(search.toLowerCase()) &&
            (filterDate === '' || n.date === filterDate)
    );

    return (
        <div className="bg-blue-50 text-gray-800 min-h-screen pt-16">
            {/* Header */}
            <div className="bg-blue-700 text-white py-20 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">News & Updates</h1>
                <p className="max-w-2xl mx-auto text-lg">
                    Stay updated with our latest healthcare news and events.
                </p>
            </div>

            {/* Filters */}
            <div className="py-10 px-4 xl:px-32">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <input
                        type="text"
                        placeholder="Search by news title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/2 p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="w-full md:w-1/3 p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Filter by Date</option>
                        {[...new Set(newsList.map(n => n.date))].map(date => (
                            <option key={date} value={date}>{date}</option>
                        ))}
                    </select>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNews.map(news => (
                        <div key={news.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
                            <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                            <div className="p-5">
                                <h2 className="text-xl font-bold text-blue-700 mb-1">{news.title}</h2>
                                <p className="text-gray-600 mb-3">{news.description}</p>
                                <p className="text-sm text-gray-500 mb-4">Date: {news.date}</p>
                                <button
                                    onClick={() => setViewNews(news)}
                                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
                                >
                                    View News
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredNews.length === 0 && (
                    <p className="text-center text-gray-600 mt-12">No news found with your filters.</p>
                )}
            </div>

            {/* News Detail Modal */}
            {viewNews && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full relative">
                        <button
                            onClick={() => setViewNews(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                        >&times;
                        </button>
                        <img src={viewNews.image} alt={viewNews.title} className="w-full h-64 object-cover rounded-xl mb-4" />
                        <h2 className="text-2xl font-bold text-blue-700 mb-2">{viewNews.title}</h2>
                        <p className="text-gray-600 mb-4">{viewNews.description}</p>
                        <p className="text-sm text-gray-500">Date: {viewNews.date}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NEWS;

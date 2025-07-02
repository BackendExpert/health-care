import React, { useState } from 'react';
import product1 from '../../assets/heroImg3.png'

const OurProducts = () => {
    const [search, setSearch] = useState('');
    const [priceRange, setPriceRange] = useState(5000);
    const [sortOption, setSortOption] = useState('best');

    const products = [
        { id: 1, image: product1, title: 'Heart Monitor', description: 'High precision device.', price: 1200, inStock: true },
        { id: 2, image: product1, title: 'Surgical Mask', description: 'Quality certified.', price: 100, inStock: true },
        { id: 3, image: product1, title: 'Thermometer', description: 'Fast digital readings.', price: 450, inStock: false },
        { id: 4, image: product1, title: 'Wheelchair', description: 'Comfortable & foldable.', price: 3000, inStock: true },
        { id: 5, image: product1, title: 'Blood Pressure Cuff', description: 'Automatic inflation.', price: 850, inStock: true },
        { id: 6, image: product1, title: 'Glucose Meter', description: 'Easy home checks.', price: 2200, inStock: false },
        { id: 7, image: product1, title: 'First Aid Kit', description: 'Comprehensive supplies.', price: 750, inStock: true },
        { id: 8, image: product1, title: 'Oximeter', description: 'Fast oxygen readings.', price: 650, inStock: true },
        { id: 9, image: product1, title: 'Syringe Pack', description: 'Sterile disposable.', price: 300, inStock: true },
        { id: 10, image: product1, title: 'Hospital Bed', description: 'Adjustable positions.', price: 5000, inStock: false },
        { id: 11, image: product1, title: 'IV Stand', description: 'Stainless steel.', price: 1200, inStock: true },
        { id: 12, image: product1, title: 'Nebulizer', description: 'For respiratory care.', price: 1800, inStock: true },
    ];

    // Filter by search & price
    let filteredProducts = products.filter(
        p => p.title.toLowerCase().includes(search.toLowerCase()) && p.price <= priceRange
    );

    // Sorting
    if (sortOption === 'low') filteredProducts.sort((a, b) => a.price - b.price);
    else if (sortOption === 'high') filteredProducts.sort((a, b) => b.price - a.price);

    return (
        <div className="bg-blue-50 text-gray-800 min-h-screen pt-16">
            {/* Header */}
            <div className="bg-blue-700 text-white py-20 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Our Products</h1>
                <p className="max-w-2xl mx-auto text-lg">Browse our range of high-quality medical products.</p>
            </div>

            {/* Filters */}
            <div className="py-10 px-4 xl:px-32">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <input
                        type="text"
                        placeholder="Search by product name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/3 p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
                        <label className="text-sm font-medium mb-2">Max Price: Rs. {priceRange}</label>
                        <input
                            type="range"
                            min="100"
                            max="5000"
                            step="50"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="w-full md:w-1/4 p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="best">Best Match</option>
                        <option value="low">Lowest Price</option>
                        <option value="high">Highest Price</option>
                    </select>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
                            <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                            <div className="p-5">
                                <h2 className="text-lg font-bold text-blue-700 mb-1">{product.title}</h2>
                                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-blue-600 font-bold">Rs. {product.price.toLocaleString()}</span>
                                    <span className={product.inStock ? "text-green-600" : "text-red-500"}>
                                        {product.inStock ? "In Stock" : "Out of Stock"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <p className="text-center text-gray-600 mt-12">No products match your filters.</p>
                )}
            </div>
        </div>
    );
};

export default OurProducts;

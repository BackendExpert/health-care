import React from 'react'
import DefaultBtn from '../../components/Buttons/DefultBtn';

import product1 from '../../assets/heroImg3.png'
import product2 from '../../assets/product1.png'
import product3 from '../../assets/product2.png'

const HotProducts = () => {
    const products = [
        {
            id: 1,
            image: product1,
            name: 'Product 1',
            description: 'This is a short description for product 1.',
            price: '1,000',
            inStock: true,
        },
        {
            id: 2,
            image: product2,
            name: 'Product 2',
            description: 'This is a short description for product 2.',
            price: '1,100',
            inStock: true,
        },
        {
            id: 3,
            image: product3,
            name: 'Product 3',
            description: 'This is a short description for product 3.',
            price: '1,200',
            inStock: false,
        },
        {
            id: 4,
            image: product1,
            name: 'Product 4',
            description: 'This is a short description for product 4.',
            price: '1,300',
            inStock: true,
        },
        {
            id: 5,
            image: product2,
            name: 'Product 5',
            description: 'This is a short description for product 5.',
            price: '1,400',
            inStock: false,
        },
        {
            id: 6,
            image: product3,
            name: 'Product 6',
            description: 'This is a short description for product 6.',
            price: '1,500',
            inStock: true,
        },
        {
            id: 7,
            image: product1,
            name: 'Product 7',
            description: 'This is a short description for product 7.',
            price: '1,600',
            inStock: true,
        },
        {
            id: 8,
            image: product3,
            name: 'Product 8',
            description: 'This is a short description for product 8.',
            price: '1,700',
            inStock: false,
        },

    ];

    return (
        <div className='bg-blue-100 py-20 px-4 xl:px-32'>
            <h1 className="text-blue-700 text-3xl font-bold uppercase text-center mb-12">Hot Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map(product => (
                    <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-72 object-cover" />
                        <div className="p-5">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                            <p className="text-gray-600 mb-3">{product.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-blue-600">Rs. {product.price}</span>
                                {product.inStock ? (
                                    <span className="text-green-600 font-medium">In Stock</span>
                                ) : (
                                    <span className="text-red-500 font-medium">Out of Stock</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <center className='mt-8'>
                <a href="/products">
                    <DefaultBtn
                        label='View More Products'
                        type='button'
                    />
                </a>
            </center>
        </div>
    )
}

export default HotProducts

import React from 'react'
import Slider from '../../components/ImageSliders/Slider'
import OurServices from './OurServices'
import DataCount from './DataCount'
import HotProducts from './HotProducts'

const HomePage = () => {
    return (
        <div>
            <Slider />
            <OurServices />
            <DataCount />
            <HotProducts />
        </div>
    )
}

export default HomePage
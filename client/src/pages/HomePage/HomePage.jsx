import React from 'react'
import Slider from '../../components/ImageSliders/Slider'
import OurServices from './OurServices'
import DataCount from './DataCount'
import HotProducts from './HotProducts'
import NEWS from './NEWS'

const HomePage = () => {
    return (
        <div>
            <Slider />
            <OurServices />
            <DataCount />
            <HotProducts />
            <NEWS />
        </div>
    )
}

export default HomePage
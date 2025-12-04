import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import RecentProducts from './RecentProducts';

 



const Home = () => {
    const [recent, setRecent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://krishilink-api-server.vercel.app/recent-products')
            .then(res => res.json())
            .then(data => {
                setRecent(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);
    return (
        <div>
            <Banner></Banner>
            <RecentProducts recent={recent} loading={loading}></RecentProducts>
            
        </div>
    );
};

export default Home;
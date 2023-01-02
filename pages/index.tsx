import type { NextPage } from 'next'
import Homepage from '../src/components/public/homepage/Homepage';
import Layout from '../src/components/common/layout/Layout';

const Home: NextPage = () => {
  return (
    <Layout children={<Homepage />} />  
  );
}

export default Home

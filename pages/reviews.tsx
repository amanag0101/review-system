import type { NextPage } from 'next'
import Layout from '../src/components/common/layout/Layout';
import Review from '../src/components/public/review/Review';

const Reviews: NextPage = () => {
  return (
    <Layout children={<Review />} />  
  );
}

export default Reviews

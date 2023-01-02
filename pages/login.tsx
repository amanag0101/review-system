import type { NextPage } from 'next'
import Layout from '../src/components/common/layout/Layout';
import Authentication from '../src/components/public/login/Authentication';

const Login: NextPage = () => {
  return (
    <Layout children={<Authentication />} />  
  );
}

export default Login

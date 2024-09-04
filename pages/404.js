import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 5000);
  }, []);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>You will be redirected to the home page in 5 seconds.</p>
    </div>
  );
};

export default Custom404;

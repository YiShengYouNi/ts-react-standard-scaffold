import type { FC } from 'react';

const About: FC = () => {
  return (
    <section>
      <h1>About</h1>
      <p>This page is code-split via React.lazy and Suspense.</p>
    </section>
  );
};
export default About;

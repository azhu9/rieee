import { useLayoutEffect } from 'react';

const ScrollToTop = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
};

export default ScrollToTop;
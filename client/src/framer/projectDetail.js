export const projectDetail = {
  hidden: {
    y: '100vh',
    opacity: 1,
    transition: { duration: 0.8, delay: 0.2 },
  },
  in: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.7, delay: 0 },
  },
  out: {
    y: '100vh',
    opacity: 1,
    transition: { duration: 0.9, delay: 0.4 },
  },
};

export const mainImageWrap = {
  hidden: {
    height: '100vh',
    transition: { duration: 0.4, delay: 0 },
  },
  in: {
    height: document.body.offsetWidth > 400 ? '40vh' : '25vh',
    transition: { duration: 1.2, delay: 0.5 },
  },
  out: {
    height: '100vh',
    transition: { duration: 0.6, delay: 0 },
  },
};

export const mainImageCover = {
  hidden: {
    scaleY: 1,
    transition: { duration: 0, delay: 0.9 },
  },
  in: {
    scaleY: 0,
    transition: { duration: 0.9, delay: 0.6 },
  },
  out: {
    scaleY: 1,
    transition: { duration: 0, delay: 0.9 },
  },
};

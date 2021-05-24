export const projectDetail = {
  in: {
    y: '0%',
    transition: { duration: 0.7, delay: 0 },
  },
  out: {
    y: '100vh',
    transition: { duration: 0.5, delay: 0.4 },
  },
};

export const mainImageWrap = {
  in: {
    height: document.body.offsetWidth > 400 ? '40vh' : '25vh',
    transition: { duration: 1.2, delay: 1.1 },
  },
  out: {
    height: '100vh',
    transition: { duration: 0.4, delay: 0 },
  },
};

export const mainImageCover = {
  in: {
    scaleY: 0,
    transition: { duration: 0.9, delay: 0.6 },
  },
  out: {
    scaleY: 1,
    transition: { duration: 0, delay: 0.9 },
  },
};

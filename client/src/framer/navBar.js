export const navContain = {
  in: {
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
  out: {
    opacity: 0,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
};

export const navUl = {
  in: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
  out: {
    opacity: 0,
    y: 200,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
};

export const linkEl = {
  in: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  out: {
    opacity: 0,
    x: -70,
    y: 0,
  },
};

export const navEl = {
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: 70,
  },
};

export const about = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0,
    },
  },
  out: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      duration: 0,
    },
  },
};

export const mainText = {
  hidden: (i) => ({
    x: `${i * 1.6}em`,
    y: 'calc(40vh - 120px)',
    scale: 3,
  }),
  visible: (i) => ({
    x: `0%`,
    y: `0%`,
    scale: 1,
    transition: {
      delay: 0.5,
      duration: 1,
    },
  }),
  out: (i) => ({
    x: `${-i * 5}%`,
    y: `${i * 15}%`,
  }),
};

export const aboutContain = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export const ability = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 5.2,
      duration: 0.4,
    },
  },
  out: {
    opacity: 0,
    y: 100,
    transition: {
      duration: 0.4,
    },
  },
};

export const pageTitle = {
  hidden: {
    x: '-50%',
    y: '-500%',
  },
  visible: {
    x: '-50%',
    y: '-50%',
  },
  out: {
    x: '-50%',
    y: '-500%',
  },
};

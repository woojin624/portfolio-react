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
    x: `${-i * 2 - 2.5}em`,
    y: 'calc(70vh - 120px)',
    rotate: '-180deg',
    scale: 7,
  }),
  visible: (i) => ({
    x: `0%`,
    y: `0%`,
    rotate: '0deg',
    scale: 1,
    transition: {
      delay: 0,
      duration: 1,
    },
  }),
  out: (i) => ({
    x: `${-i * 0.7}em`,
    y: 'calc(10vh - 120px)',
    rotate: '180deg',
    scale: 0,
    transition: {
      delay: 0,
      duration: 0.7,
    },
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
      duration: 0,
      when: 'afterChildren',
    },
  },
};

export const opacity = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.6,
    },
  },
  out: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.7,
    },
  },
};

export const ability = {
  hidden: {
    opacity: 0,
    y: 150,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.6,
    },
  },
  out: {
    opacity: 0,
    y: 30,
    transition: {
      duration: 0.7,
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

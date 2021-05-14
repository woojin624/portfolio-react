export const home = {
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

export const landContain = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  out: {
    opacity: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
};

export const introTextSpan = {
  hidden: {
    y: '100%',
  },
  visible: (i) => ({
    y: '0%',
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
  out: (i) => ({
    y: '-100%',
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
};

export const workThumb = {
  hidden: {
    x: '0%',
    y: '0%',
  },
  visible: (i) => ({
    x: `${-i * 5}%`,
    y: `${i * 15}%`,
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

export const cornerCircle = {
  hidden: {
    x: '-50%',
    y: '-50%',
    scale: 0,
  },
  visible: {
    x: '-50%',
    y: '-50%',
    scale: 0.5,
    transition: {
      delay: 0,
      ease: 'easeInOut',
      duration: 0.8,
    },
  },
  out: {
    opacity: [1, 1, 0],
    x: '-50%',
    y: '-50%',
    scale: [1, 15, 15],
    transition: {
      ease: 'easeInOut',
      duration: 1,
    },
  },
};

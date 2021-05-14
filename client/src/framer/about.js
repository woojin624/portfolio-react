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
      delay: 0.2,
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

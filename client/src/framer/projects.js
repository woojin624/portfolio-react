export const projects = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0,
    },
  },
  out: {
    opacity: 1,
    transition: {
      when: 'afterChildren',
      duration: 0,
    },
  },
};

export const projectBox = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 0.3,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export const initTitle = {
  hidden: {
    opacity: 0,
    x: '-100%',
  },
  visible: {
    opacity: 1,
    x: '0',
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
  out: {
    opacity: 0,
    transition: {
      delay: 0.3,
      duration: 0.4,
    },
  },
};

export const initTitleSpan = {
  hidden: (i) => ({
    opacity: 0,
    y: 150,
    x: `${-i * 30}`,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.4,
    },
  },
  out: (i) => ({
    opacity: 0,
    x: `${i * 200}%`,
    transition: {
      delay: 0,
      ease: 'easeInOut',
      duration: 0.5,
    },
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

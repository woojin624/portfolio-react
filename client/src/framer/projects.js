export const projectMotion = {
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

export const projectBoxWrap = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.1,
      duration: 0.3,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const projectBoxMotion = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.1,
      duration: 0.3,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const initTitleWrap = {
  hidden: {
    opacity: 0,
    x: '-100%',
    letterSpacing: '-3rem',
  },
  visible: {
    opacity: 1,
    x: '0',
    letterSpacing: '-0.2rem',
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
  out: {
    opacity: 0,
    letterSpacing: '15rem',
    transition: {
      delay: 0.3,
      duration: 0.4,
    },
  },
};

export const initTitleMotion = {
  hidden: {
    y: 100,
    x: -100,
  },
  visible: {
    y: 0,
    x: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.4,
    },
  },
  out: {
    y: -10,
    x: 0,
    transition: {
      delay: 0.5,
      ease: 'easeInOut',
      duration: 0.5,
    },
  },
};

export const pageTitleMotion = {
  hidden: {
    x: '-50%',
    y: '-450%',
  },
  visible: {
    x: '-50%',
    y: '-50%',
  },
  out: {
    x: '-50%',
    y: '-450%',
  },
};

const aboutMotion = {
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

const pageTitleMotion = {
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

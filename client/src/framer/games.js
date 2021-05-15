export const games = {
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

export const gameText = {
  hidden: {
    opacity: 0,
    x: '-100%',
  },
  visible: {
    opacity: 1,
    x: '0%',
  },
  out: {
    opacity: 0,
    x: '-100%',
  },
};

export const gamesList = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: 100,
    transition: {
      duration: 0.3,
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

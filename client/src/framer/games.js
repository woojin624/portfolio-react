export const gameMotion = {
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

export const gameTextMotion = {
  start: {
    opacity: 0,
    fontSize: '10px',
    fontWeight: '300',
    y: -400,
  },
  in: {
    opacity: 1,
    fontSize: '48px',
    fontWeight: '700',
    y: 0,
  },
  end: {
    opacity: 0,
    fontSize: '24px',
    fontWeight: '400',
    y: 600,
  },
};

export const gameListVariants = {
  start: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  end: {
    opacity: 0,
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

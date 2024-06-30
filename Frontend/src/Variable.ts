export const FadeIn = (direction: string, delay: number) => {
  return {
    hidden: {
      y: direction === 'up' ? -40 : direction === 'down' ? 40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 1,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.75, 0.25, 0.75],
      },
    },
  };
};


export const rightIn = (delay: number) => {
  return {
    hidden: {
      x: 40,
      opacity: 1,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};
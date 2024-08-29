export const scrollElementToTop = (element: HTMLElement) => {
  element.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const SessionStorageManager = {
  setScrollPosition: (y) => sessionStorage.setItem("scrollPosition", y),
  getScrollPosition: () => sessionStorage.getItem("scrollPosition"),
  removeScrollPosition: () => sessionStorage.removeItem("scrollPosition"),
};

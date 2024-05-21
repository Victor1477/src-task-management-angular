export function disableBodyScroll() {
  document.querySelector('body').style.overflow = 'hidden';
}

export function enableBodyScroll() {
  document.querySelector('body').style.overflow = 'auto';
}

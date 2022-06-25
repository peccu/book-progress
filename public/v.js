(() => {
  const v = 1656163424;
  if (!localStorage.getItem("v")) {
    localStorage.setItem("v", v);
    return;
  }
  if (localStorage.getItem("v") < v) {
    localStorage.setItem("v", v);
    location.reload();
  }
})();

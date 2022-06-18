(() => {
  const v = 1655571219;
  if (!localStorage.getItem("v")) {
    localStorage.setItem("v", v);
    return;
  }
  if (localStorage.getItem("v") < v) {
    localStorage.setItem("v", v);
    location.reload();
  }
})();

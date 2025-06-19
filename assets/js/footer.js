function loadFooter() {
  fetch('footer.html')
    .then(res => {
      if (!res.ok) throw new Error();
      return res.text();
    })
    .then(data => {
      document.body.insertAdjacentHTML('beforeend', data);
    })
    .catch(() => {
      fetch('../footer.html')
        .then(res => res.text())
        .then(data => {
          document.body.insertAdjacentHTML('beforeend', data);
        });
    });
}
loadFooter();

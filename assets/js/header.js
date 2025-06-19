function loadHeader() {
  fetch('header.html')
    .then(res => {
      if (!res.ok) throw new Error();
      return res.text();
    })
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
    })
    .catch(() => {
      fetch('../header.html')
        .then(res => res.text())
        .then(data => {
          document.body.insertAdjacentHTML('afterbegin', data);
        });
    });
}
loadHeader();

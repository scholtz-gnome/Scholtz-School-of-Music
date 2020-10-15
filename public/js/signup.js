const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const first = form.first.value;
  const last = form.last.value;
  const email = form.email.value;
  const password = form.password.value;
  
  fetch("/account/signup", {
    method: "POST",
    body: JSON.stringify({ first, last, email, password}),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));

});
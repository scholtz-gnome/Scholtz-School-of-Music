const form = document.querySelector("form");

const firstErrors = document.querySelector(".firstErrors");
const lastErrors = document.querySelector(".lastErrors");
const emailErrors = document.querySelector(".emailErrors");
const passwordErrors = document.querySelector(".passwordErrors");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  firstErrors.textContent = "";
  lastErrors.textContent = "";
  emailErrors.textContent = "";
  passwordErrors.textContent = "";

  const first = form.first.value;
  const last = form.last.value;
  const email = form.email.value;
  const password = form.password.value;
  
  try {

    const res = await fetch("/account/signup", {
      method: "POST",
      body: JSON.stringify({ first, last, email, password}),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    
    if (data.errors) {
      firstErrors.textContent = data.errors.first;
      lastErrors.textContent = data.errors.last;
      emailErrors.textContent = data.errors.email;
      passwordErrors.textContent = data.errors.password;
    } else if (data) {
      location.assign(data.redirect);
    }
    

  }
  catch (err) {

    console.log(err);

  }

});
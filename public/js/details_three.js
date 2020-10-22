const form = document.querySelector(".details__three");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const registrationProcess = Number(form.dataset.process);
  const id = form.dataset.id;
  const endpoint = `/join/${id}`;

  const first = form.first.value;
  const last = form.last.value;
  const age = Number(form.age.value);
  const gender = form.gender.value;
  const email = form.email.value;
  const cell = form.cell.value;

  try {
    const res = await fetch(endpoint, {
      method: "PATCH",
      body: JSON.stringify({ first, last, age, gender, email, cell, registrationProcess }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    location.assign(data.redirect);
    
  }
  catch (err) {
    console.log(err);
  }

});
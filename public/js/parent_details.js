const form = document.querySelector(".parent__details");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = form.dataset.id;
  const registrationProcess = Number(form.dataset.process);

  const first = form.first.value;
  const last = form.last.value;
  const email = form.email.value;
  const cell = form.cell.value;

  const endpoint = `/join/${id}`;

  try {
    const res = await fetch(endpoint, {
      method: "PATCH",
      body: JSON.stringify({ first, last, email, cell, registrationProcess }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    location.assign(data.redirect);
    
  }
  catch (err) {
    console.log(err);
  }

});
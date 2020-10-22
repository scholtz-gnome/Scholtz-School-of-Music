const form = document.querySelector(".details__one");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = form.dataset.id;
  const registrationProcess = Number(form.dataset.process);
  const student = form.student.value;
  const endpoint = `/join/${id}`;
  
  try {
  const res = await fetch(endpoint, {
    method: "PATCH",
    body: JSON.stringify({ student, registrationProcess }),
    headers: { "Content-Type": "application/json" }
  });

  const data = await res.json();
  location.assign(data.redirect);

  }
  catch (err) {
    console.log(err);
  }
});
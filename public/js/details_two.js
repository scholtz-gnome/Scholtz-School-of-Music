const form = document.querySelector(".details__two");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = form.dataset.id;
  const registrationProcess = Number(form.dataset.process);

  const discipline = form.discipline.value;
  const lessons = Number(form.lessons.value);
  const level = form.level.value;

  const endpoint = `/join/${id}`;

  try {
    const res = await fetch(endpoint, {
      method: "PATCH",
      body: JSON.stringify({ discipline, lessons, level, registrationProcess }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    location.assign(data.redirect);
  }
  catch (err) {
    console.log(err);
  }

});
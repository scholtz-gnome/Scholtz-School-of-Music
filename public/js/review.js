const form = document.querySelector(".review");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const id = form.dataset.id;
  const registrationProcess = Number(form.dataset.process);
  const endpoint = `/join/review/${id}`;

  // Student's Details
  const first = form.first.value;
  const last = form.last.value;
  const email = form.email.value;
  const cell = form.cell.value;
  const age = Number(form.age.value);
  const gender = form.gender.value;
  const discipline = form.discipline.value;
  const lessons = form.lessons.value;
  const level = form.level.value;

  // Parent's Details
  const parent_first = form.parent_first.value;
  const parent_last = form.parent_last.value;
  const parent_email = form.parent_email.value;
  const parent_cell = form.parent_cell.value;

  try {
    await fetch(endpoint, {
      method: "PATCH",
      body: JSON.stringify({
        discipline,
        lessons,
        level,
        registrationProcess,
        parent: { first: parent_first, last: parent_last, email: parent_email, cell: parent_cell },
        student: { first, last, email, cell, age, gender }
      }),
      headers: { "Content-Type": "application/json" }
    });

    location.assign(`/join/completed/${id}`);

  }
  catch (err) {
    console.log(err);
  }

});
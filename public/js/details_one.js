const form = document.querySelector(".details__one");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = form.dataset.id;
  const student = form.student.value;
  const endpoint = `/join/${id}`;
  try {
  const res = await fetch(endpoint, {
    method: "PATCH",
    body: JSON.stringify({ student }),
    headers: { "Content-Type": "application/json" }
  });

  const data = await res.json();
  location.assign(data.redirect);

  }
  catch (err) {
    console.log(err);
  }
});
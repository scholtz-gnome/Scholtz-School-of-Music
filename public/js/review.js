const form = document.querySelector(".review");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = form.dataset.id;
  const registrationProcess = form.dataset.process;
  const endpoint = `/join/:id`;

  
});
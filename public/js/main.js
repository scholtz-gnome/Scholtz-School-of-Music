const dropdowns = document.querySelectorAll(".dropdown");
const secondNav = document.querySelector(".secondNav");
const secondUl = document.querySelector(".secondNav > ul");
const links = document.querySelectorAll("[data-discipline]");
const hamburger = document.querySelector(".fa-bars");
const dropcontentLinks = document.querySelectorAll(".drop-content > a");

links.forEach(link => {
  link.addEventListener("click", async () => {
    const discipline = link.dataset.discipline;
    const endpoint = `/join/${discipline}`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ discipline }),
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.json();
      
      location.assign(data.redirect);
    }
    catch (err) {
      console.log(err);
    }

  });
});

hamburger.addEventListener("click", e => {

  secondNav.classList.toggle("hidden");
  

});
const ul = document.querySelector("ul");

const user = ul.dataset.user;
const first = ul.dataset.first;
const last = ul.dataset.last;

if (window.innerWidth <= 925) {
  if (user) {
    ul.innerHTML = `
      <li class="dropdown account-user">
        <button class="drop-button">Menu</button>
        <div class="drop-content">
          <a href="/join">Join</a>
          <a href="/resources">Resources</a>
          <a href="/contact">Find Answers</a>
        </div>
      </li>
      <li class="dropdown account-user">
        <button class="drop-button"><a href="/account">${first} ${last}</a></button>
        <div class="drop-content">
          <a href="/account/lessons">Lessons</a>
          <a href="/account/invoices">Invoices</a>
          <a href="/account/logout">Logout</a>
        </div>
      </li>
    `;
  } else {
    ul.innerHTML = `
    <li class="dropdown account-user">
        <button class="drop-button">Menu</button>
        <div class="drop-content">
          <a href="/join">Join</a>
          <a href="/resources">Resources</a>
          <a href="/contact">Find Answers</a>
        </div>
      </li>
    <li class="dropdown account-noUser">
      <button class="drop-button"><a href="/account">Account</a></button>
      <div class="drop-content">
        <a href="/account/login">Log In</a>
        <a href="/account/signup">Sign Up</a>
      </div>
    </li>
  `;
  }
}
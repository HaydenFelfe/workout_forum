async function addUserHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to create user!");
  }
}
document
  .querySelector(".user-registration-form")
  .addEventListener("submit", addUserHandler);

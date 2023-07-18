document.querySelector(".login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to log in. Please try again.");
    }
  });


//   <script src="/js/login-user.js"></script>

//   <form class="login-form">
//   <input type="email" id="email" name="email" placeholder="Email" required>
//   <input type="password" id="password" name="password" placeholder="Password" required>
//   <button type="submit">Log In</button>
// </form>
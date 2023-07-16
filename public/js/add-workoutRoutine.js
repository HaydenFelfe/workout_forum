// const authToken = localStorage.getItem('authToken');

document.querySelector(".add-workoutRoutine-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const bodyPart = document.querySelector("#bodyPart").value;
    const userId = document.querySelector("#userId").value;

    try {
      const response = await fetch("/api/workoutRoutine", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          bodyPart,
          userId,
        }),
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${authToken}`
        },
      });
      if (response.ok) {
        document.location.replace("/");
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (err) {
      console.log(error);
      alert(
        "Failed to add workout routine. Please try again and make sure you are logged in."
      );
    }
  });

// <!-- index.html (or any relevant HTML file) -->

// <!-- Add this script tag at the end of the body section -->
// <script src="/js/add-workoutRoutine.js"></script>

// <!-- index.html (or any relevant HTML file) -->

// <form class="add-workoutRoutine-form">
//   <input type="text" id="name" name="name" placeholder="Workout Routine Name" required>
//   <textarea id="description" name="description" placeholder="Description" required></textarea>
//   <input type="number" id="duration" name="duration" placeholder="Duration" required>
//   <!-- Add other relevant form inputs -->
//   <button type="submit">Add Workout Routine</button>
// </form>

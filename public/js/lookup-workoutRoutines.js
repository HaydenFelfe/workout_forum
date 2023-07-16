document.addEventListener("click", async function (event) {
  if (event.target.classList.contains("body-part")) {
    const bodyPart = event.target.dataset.bodyPart;
    try {
      const response = await fetch(`/api/workoutRoutine/workout/${bodyPart}`);
      if (response.ok) {
        const workoutRoutines = await response.json();
        const workoutRoutinesList = document.getElementById(
          "workout-routines-list"
        );

        workoutRoutinesList.innerHTML = "";
        workoutRoutines.forEach((workoutRoutine) => {
          const workoutRoutineElement = document.createElement("li");
          workoutRoutineElement.textContent = workoutRoutine.title;
          workoutRoutineElement.classList.add("workout-routine");
          workoutRoutinesList.appendChild(workoutRoutineElement);
        });
      } else {
        throw new Error("Failed to retrieve workout routines");
      }
    } catch (err) {
      console.error(error);
    }
  }
});

/*
<script id="workout-routines-template" type="text/x-handlebars-template">
  {{#each workoutRoutines}}
    <li class="workout-routine">{{title}}</li>
  {{/each}}
</script>

<ul id="workout-routines-list"></ul>

*/

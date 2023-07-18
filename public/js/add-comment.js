document.querySelector('.add-comment').addEventListener('submit', async function (event) {
    event.preventDefault();

    const comment = document.querySelector('#comment').value;
    const workout_routine_id = document.querySelector('#workout_routine_id').value;

    try {
      const userResponse = await fetch('/api/user');
      const userData = await userResponse.json();

      const userId = userData.id;

      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ comment, workout_routine_id, userId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log("Comment created successfully");
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create comment. Please try again");
    }
  });


//   <script id="add-comment-template" type="text/x-handlebars-template">
//   <form class="add-comment">
//     <input type="text" id="comment" name="comment" placeholder="Comment" required>
//     <input type="hidden" id="workout_routine_id" name="workout_routine_id" value="{{workoutRoutineId}}">
//     <input type="hidden" id="userId" name="userId" value="{{userId}}">
//     <button type="submit">Submit Comment</button>
//   </form>
// </script>

// <!-- The container where the form will be rendered -->
// <div id="add-comment-container"></div>
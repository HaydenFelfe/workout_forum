document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', async function() {
      const workoutRoutineId = button.dataset.workoutId;
  
      try {
        const response = await fetch('/api/like', {
          method: 'POST',
          body: JSON.stringify({ workoutRoutineId }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (response.ok) {
          const likeCountElement = button.nextElementSibling;
          const likeCount = parseInt(likeCountElement.textContent);
          likeCountElement.textContent = likeCount + 1;
        } else {
          const data = await response.json();
          throw new Error(data.error);
        }
      } catch (error) {
        console.error(error);
        alert('Failed to add like. Please try again.');
      }
    });
  });



// <!-- workout-routine.handlebars -->
// {{!-- Iterate over the workout routines --}}
// {{#each workoutRoutines}}
//   <div class="workout-routine">
//     <h2>{{title}}</h2>
//     <p>{{description}}</p>
//     <div class="comments-section">
//       {{!-- Iterate over the comments for this workout routine --}}
//       {{#each comments}}
//         <p>{{comment}}</p>
//       {{/each}}
//     </div>
//     <div class="likes-section">
//       <button class="like-button" data-workout-routine-id="{{id}}">Like</button>
//       <span class="like-count">{{likeCount}}</span>
//     </div>
//   </div>
// {{/each}}
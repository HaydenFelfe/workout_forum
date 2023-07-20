const commentFormHandler = async function(event) {
    event.preventDefault();
  
    const workoutId = document.querySelector('input[name="post-id"]').value;
    const description = document.querySelector('textarea[name="comment-body"]').value;
  
    if (description) {
      await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          workoutId,
          description
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      document.location.reload();
    }
  };
  
  document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);
  
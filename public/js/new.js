const newFormHandler = async function (event) {
  event.preventDefault();

  const response = await fetch('/api/user-id');
  const data = await response.json();
  const user_id = data.user_id;

  const title = document.querySelector('input[name="post-title"]').value;
  const description = document.querySelector('textarea[name="post-body"]').value;
  const bodyPart = document.querySelector('select[name="body-part"]').value;
  
  if (user_id) {
    await fetch(`/api/workout-routines`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        user_id,
        bodyPart,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    document.location.replace('/workout');
  } else {
    // Handle authentication failure (e.g., show an error message, redirect to login page)
    console.log('User is not authenticated');
    // Add your custom logic here
  }
};



document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);



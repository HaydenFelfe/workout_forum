const newFormHandler = async function (event) {
    event.preventDefault();
  
    const workout = document.querySelector('input[name="post-title"]').value;
    const description = document.querySelector('textarea[name="post-body"]').value;
    const bodyPart = document.querySelector('select[name="body-part"]').value;
  
    try {
      const response = await fetch('/api/workout-routines', {
        method: 'POST',
        body: JSON.stringify({
          title: workout,
          description,
          bodyPart,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/workout'); 
      } else {
        console.error('Error: Unable to save the workout routine.');
      }
    } catch (error) {
      console.error('Error: Unable to fetch data from the server.', error);
    }
  };
  
  document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);
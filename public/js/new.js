const newFormHandler = async function (event) {
    event.preventDefault();
  
    const workout = document.querySelector('input[name="post-title"]').value;
    const description = document.querySelector('textarea[name="post-body"]').value;
    const bodyPart = document.querySelector('select[name="body-part"]').value;
  
    await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        workout,
        description,
        bodyPart, 
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace('/workout');
  };
  
  document
    .querySelector('#new-post-form')
    .addEventListener('submit', newFormHandler);
  
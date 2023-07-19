const logout = async function () {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log out');
    }
  } catch (err) {
    console.error('Error during logout:', err);
    alert('Failed to log out');
  }
};

document.querySelector('#logout-link').addEventListener('click', logout);

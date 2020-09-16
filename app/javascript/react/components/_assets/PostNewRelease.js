const PostNewRelease = (body, redirect, artistID) => {
  fetch(`/api/v1/artists/${artistID}/releases`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },

    credentials: "same-origin",
  })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw error;
      }
    })
    .then((response) => response.json())
    .then((body) => {
      redirect(true);
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));

}

export default PostNewRelease

const PostNewRelease = (form, redirect, artistID, setResponse) => {
  let body = new FormData();
  body.append("title", form.title);
  body.append("release_type", form.release_type);
  body.append("original_release_year", form.year);
  body.append("embed_url", form.embed_url);
  body.append("description", form.description);
  form.artists.forEach((artist) => {
    body.append("artists[]", artist);
  });

  body.append("image", form.image[0]);

  fetch(`/api/v1/artists/${artistID}/releases`, {
    method: "POST",
    body: body,
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
    .then((body) => setResponse(body))
    .then(redirect(true))
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
};

export default PostNewRelease;

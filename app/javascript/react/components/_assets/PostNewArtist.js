const postNewArtist = (form, redirect) => {
  let body = new FormData();
  body.append("name", form.name);
  body.append("description", form.description);
  form.altName.forEach((altName) => {
    body.append("alt_name[]", altName);
  });

  body.append("image", form.image[0]);
  
  fetch(`/api/v1/artists`, {
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
    .then((body) => console.log(body))
    .then(redirect(true))
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
};

export default postNewArtist;

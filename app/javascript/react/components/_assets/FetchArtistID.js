
const FetchArtistID = (artistid, setter) => {
  fetch(`/api/v1/artists/${artistid}/`)
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
    setter(body);
  })
  .catch((error) => console.error(`Error in fetch: ${error.message}`));
}

export default FetchArtistID

const FetchAllArtists = (setter) => {
  fetch("/api/v1/artists")
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
  
};

export default FetchAllArtists;

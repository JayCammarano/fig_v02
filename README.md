# Fig
[![Codeship Status for JayCammarano/fig_v02](https://app.codeship.com/projects/c3546400-e0b0-0138-a44e-12afd896c336/status?branch=master)](https://app.codeship.com/projects/409934) [![codecov](https://codecov.io/gh/JayCammarano/fig_v02/branch/master/graph/badge.svg)](https://codecov.io/gh/JayCammarano/fig_v02)

https://fig-music.herokuapp.com/

With Fig I brought together the extensive music metadata of Discogs and Last.fm with the streaming aspects of SoundCloud.

I focus on user-curated selections rather than algorithms, which leaves you listening to the same things over and over. This approach creates an even playing field for artists who would otherwise get pushed to the margins.

Upon login, a user can add artists and their releases with an additional link to SoundCloud embedding.

I designed a strong but flexible upload system allowing a user to add multiple artists with multiple releases even when the artist has multiple aliases. I did this through extensive use of many-to-many and polymorphic relationships in my database design. I also allowed image uploads for artists and release covers, which are stored using AWS S3.

Upon uploading an artist, the user can view said artist and add a release to the page. The release page features tabbed data of artist credits and also a basic description. I took care to make sure changing tabs wouldn’t stop the music. 

To ensure high-quality data, the user can edit both the artist’s information and the release information as new information is discovered.

To simplify and create a comfortable user experience, I focused on keeping the pages as lightweight as possible. The front end is built entirely in React to ensure that the site is responsive. I started with a utility-based Bulma CSS theme and, through a Sass precompiler, added more customization and functionality for styling.

I hope for a fulfilling experience for the user, where passion for information and learning meets a passion for community and music.


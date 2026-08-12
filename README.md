# Umeed-e-Sahar — V4 Editorial Website

This version is designed so the magazine can be updated without redesigning the homepage.

## Publishing workflow

1. The website is connected to the GitHub repository.
2. Open `/admin/` on the live Netlify site.
3. Log in with the GitHub account that has write access to the repository.
4. Choose **New Article** or **New Poetry**.
5. Fill in the title, author, date, category, image path and article text.
6. Click **Publish**.
7. Netlify automatically deploys the new GitHub commit.

The public website automatically reads Markdown files from the repository, so new articles appear on the homepage and in their category without editing `index.html`.

## Important

- Keep the repository public for the simplest no-cost setup.
- Keep article files in `content/articles/`.
- Keep poems in `content/poetry/`.
- Put uploaded images in `assets/images/`.
- Image paths should look like `/assets/images/my-photo.jpg`.

## One-time Netlify setup for the editor

The `/admin/` interface uses Decap CMS with GitHub authentication.

In Netlify:
1. Project configuration → Access & security → OAuth.
2. Install/Configure GitHub as an OAuth provider.
3. In GitHub, create an OAuth App using Netlify's callback URL:
   https://api.netlify.com/auth/done
4. Put the Client ID and Client Secret into Netlify.
5. Visit:
   https://YOUR-NETLIFY-SITE.netlify.app/admin/

After this one-time setup, publishing is done from the editor rather than by editing HTML.

## Design direction

Blood-red / burgundy editorial background, antique gold, faint Urdu letterforms, Pakistani cultural texture, Urdu section, poetry corner, Pakistan section, history, economics and society.

# Muntazir Mehdi — Research Portfolio Website

Personal academic portfolio site showcasing research, publications, teaching, and contact information.

## Preview locally

1. Open `index.html` in your web browser (double-click the file), or
2. If you have Python installed, run from this folder:
   ```
   python -m http.server 8000
   ```
   Then visit http://localhost:8000

## Project structure

```
website/
  index.html          Main page (all sections)
  css/style.css       Styles and animations
  js/main.js          Navigation and scroll effects
  assets/
    Muntazir_Mehdi_CV.pdf   Downloadable CV
```

## Deploy to Vercel (free)

1. Create a free account at [github.com](https://github.com) and [vercel.com](https://vercel.com)
2. Create a new GitHub repository (e.g. `muntazir-mehdi-website`)
3. Upload the contents of this `website/` folder to the repo
4. On Vercel: **Add New Project** → import your GitHub repo
5. Set **Root Directory** to `.` and **Framework Preset** to **Other**
6. Click **Deploy** — your site will be live in ~1 minute

## Add your profile photo

Save your photo as `assets/profile.jpg` and update the hero section in `index.html`:

```html
<div class="photo-frame">
  <img src="assets/profile.jpg" alt="Muntazir Mehdi" />
</div>
```

(Remove or hide the `photo-fallback` div when using a real photo.)

## Update content

Edit `index.html` directly to add publications, update experience, or change contact details. After deploying via Vercel, push changes to GitHub and the site redeploys automatically.

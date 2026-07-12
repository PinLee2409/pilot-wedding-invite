# /public/images

Drop your photos here. Filenames must match the paths in
`src/config/wedding.config.ts`. Any image that is missing shows an elegant
placeholder automatically, so the site never looks broken.

Recommended files (replace with your own, keep the same names — or update the
config):

| File                     | Used for                                   | Suggested size      |
| ------------------------ | ------------------------------------------ | ------------------- |
| `hero.jpg`               | Full-screen landing background             | 1600 × 2000 (4:5+)  |
| `bride.jpg`              | Bride portrait (Love Message)              | 800 × 800 (square)  |
| `groom.jpg`              | Groom portrait (Love Message)              | 800 × 800 (square)  |
| `timeline-1..4.jpg`      | Flight timeline photos                     | 1200 × 900 (4:3)    |
| `gallery-1..6.jpg`       | Photo gallery                              | 1000 × 1400 (5:7)   |
| `boarding-poster.jpg`    | Photo on the downloadable boarding pass    | 1080 × 720 (3:2)    |
| `prewedding-poster.jpg`  | Poster frame for the pre-wedding video     | 1600 × 900 (16:9)   |
| `og-cover.jpg`           | Social-share preview (Open Graph)          | 1200 × 630          |

Tip: compress images (e.g. squoosh.app) so the site loads fast on mobile.

## Current setup

Full-resolution masters live in `/photos-original` (git-ignored — they are
too heavy to ship). The site references the optimized copies in
`public/images/web/` (long side ≤ 1600 px, JPEG q82, plus `thumb_*` variants
for the marquee lanes). To regenerate after adding new masters, resize them
to the same spec and drop the results in `web/`.
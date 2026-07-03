# /public/videos

Optional video files.

| File              | Used for                                  |
| ----------------- | ----------------------------------------- |
| `prewedding.mp4`  | Pre-wedding film shown in the gallery      |

You can also set a hero background video via `hero.backgroundVideo` in
`src/config/wedding.config.ts` (leave it empty `""` to use the image instead).

Keep videos short and compressed (H.264 MP4, ideally < 15 MB) for fast mobile
loading. If `prewedding.mp4` is absent, the video frame simply hides itself.

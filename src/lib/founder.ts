/**
 * Johannes's portrait, shared by the home page and the story page.
 * A real photograph at src/assets/images/founder.(jpg|png|webp), ideally 4:5. No generated
 * portraits (brand/docs/08-authentic-content.md). Pages render fine without one.
 */
const photos = import.meta.glob<{ default: ImageMetadata }>('../assets/images/founder.{jpg,jpeg,png,webp}', {
  eager: true,
});

export const founderPhoto: ImageMetadata | undefined = Object.values(photos)[0]?.default;

/** Responsive widths, never wider than the source. */
export const founderPhotoWidths: number[] = founderPhoto ? [320, 480, 640, 800].filter((w) => w <= founderPhoto!.width) : [];

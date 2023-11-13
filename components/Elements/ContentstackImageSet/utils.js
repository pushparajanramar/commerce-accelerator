export function createAndConfirmWithFallbackImageSourceSets(
  imageMobile,
  imageTablet,
  imageDesktop
) {
  let imageMobileWithFallback = imageMobile;
  let imageTabletWithFallback = imageTablet;
  let imageDesktopWithFallback = imageDesktop;
  const noMobileImage = !imageMobileWithFallback || !imageMobileWithFallback.src;
  const noTabletImage = !imageTabletWithFallback || !imageTabletWithFallback.src;
  const noDesktopImage = !imageDesktopWithFallback || !imageDesktopWithFallback.src;
  if (noMobileImage) {
    if (noTabletImage) {
      imageMobileWithFallback = imageDesktopWithFallback;
    } else {
      imageMobileWithFallback = imageTabletWithFallback;
    }
  }
  if (noTabletImage) {
    if (noDesktopImage) {
      imageTabletWithFallback = imageMobileWithFallback;
    } else {
      imageTabletWithFallback = imageDesktopWithFallback;
    }
  }
  if (noDesktopImage) {
    if (noTabletImage) {
      imageDesktopWithFallback = imageMobileWithFallback;
    } else {
      imageDesktopWithFallback = imageTabletWithFallback;
    }
  }
  return {
    imageMobileWithFallback,
    imageTabletWithFallback,
    imageDesktopWithFallback
  }
}

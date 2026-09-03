import React from "react";
import { isBrokenFirebaseStorageUrl, PLACEHOLDER_IMAGE } from "../../utils/cloudinary";

// Firebase Storage is no longer available on the free (Spark) plan, so legacy
// product images that point at appspot.com are dead. Render a placeholder
// for those instead of a broken image icon.
function ProductImage({ src, alt = "", className = "", ...rest }) {
  const resolvedSrc = isBrokenFirebaseStorageUrl(src) || !src ? PLACEHOLDER_IMAGE : src;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      {...rest}
      onError={(e) => {
        // Guard against any other dead URL
        if (e.target.src !== PLACEHOLDER_IMAGE) {
          e.target.src = PLACEHOLDER_IMAGE;
        }
      }}
    />
  );
}

export default ProductImage;

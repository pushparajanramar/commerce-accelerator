export const sharedConfigProps = ({ className, alt }) => {
  return {
    alt: alt || "",
    loading: "lazy",
    className: `image-responsive  ${className ? className : ""}`,
  };
};
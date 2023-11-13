import parse from "html-react-parser";

const SectionHeading = ({ ...props }) => {
  return (
    <>
      <section className="section-heading tm-width tm-height">
        <div className={`w1 ${props?.alignment === 1 ? "center" : ""}`}>
          {props.heading && (
            <div className="heading">{parse(props?.heading)}</div>
          )}
          {props.content && (
            <div className="content">{parse(props?.content)}</div>
          )}
        </div>
      </section>
    </>
  );
};

export default SectionHeading;
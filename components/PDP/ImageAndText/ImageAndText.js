"use client";
import parse from "html-react-parser";

function ImageAndText({ imageAndText }) {
  return (
    <div className="image-and-text tm-width tm-height">
      {imageAndText.map((item, index) => (
        <div className={`w1 ${index % 2 === 0 ? "left" : "right"}`} key={index}>
          <div class="w2">
            <h1>{item.title}</h1>
            {parse(item.description)}
            {item?.information || item?.detaildesc ? (
              <ul>
                {item.information ? <li>{item.information}</li> : null}
                {item.detaildesc ? <li>{parse(item?.detaildesc)}</li> : null}
              </ul>
            ) : null}
          </div>
          <div class="w3">
            <img src={item?.url} alt="Mock Image" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageAndText;

import Image from "next/image";
import { Button } from "../../../Elements/Button";
const NavBanner = ({ navDetails }) => {
  return (
    <div className="nav-card" key={navDetails?._metadata?.uid}>
      <figure>
        <Image
          src={navDetails?.featured_image?.url}
          alt={navDetails?.alt_tag}
          width={263}
          height={258}
        ></Image>
        <figcaption>
          <span className="p-sm">{navDetails?.card_heading}</span>
          <p>
            <strong>
              {" "}
              <Button
                href={navDetails?.cta_link?.href}
                type="cta-black"
                label={navDetails?.cta_link?.title}
              />
            </strong>
          </p>
        </figcaption>
      </figure>
    </div>
  );
};

export default NavBanner;

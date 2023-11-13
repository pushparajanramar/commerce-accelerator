"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogCarousel = (props) => {
  const { wrap, blog_carousel_cards } = props ?? {};

  const changeDateFormat = (date) => {
    const [year, month, day] = date.split("-");
    const formattedDate = `${day}.${month}.${year}`;
    return <div>{formattedDate}</div>;
  };

  return (
    <>
      <div
        className={`blog-carousel ${!wrap ? "no-wrap" : ""} tm-width tm-height`}
      >
        <ul>
          {blog_carousel_cards?.length > 0 &&
            blog_carousel_cards.map((card, index) => {
              return (
                <li key={index}>
                  <Link href={card?.link?.href} className="w1">
                    <div className={`w2`}>
                      <Image
                        loader={() => card?.thumbnail_image?.url}
                        unoptimized
                        src={card?.thumbnail_image?.url}
                        width={100}
                        height={100}
                        alt={card?.post_title}
                      />
                    </div>
                    <div className="w3">
                      <div className="blog-category p-xs">
                        {card?.blog_category}
                      </div>
                      <div className="post-title product-name">
                        {card?.post_title}
                      </div>
                      <div className="date p-xs">
                        {changeDateFormat(card?.date)}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default BlogCarousel;

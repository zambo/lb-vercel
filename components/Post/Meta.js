import React from "react";
import Image from "next/image";
import { Icon } from "components";

export default function PostMeta({ author, date, readingTime }) {
  const formatDate = new Date(date);

  return (
    <>
      <div className='flex gap-3 md:gap-6 xl:gap-16 items-center'>
        <div className='flex gap-3 items-center justify-start text-white'>
          {author?.avatar?.url && (
            <Image
              alt={author.name}
              src={author.avatar.url}
              layout='fixed'
              width={40}
              height={40}
              priority
            />
          )}

          <div>{author.name}</div>
        </div>

        <div className='flex text-white items-center gap-3'>
          <Icon className='text-lg' name='RiCalendar2Fill' />

          <span>
            {formatDate.toLocaleString("en-US", {
              month: "long", // "June"
              day: "2-digit", // "01"
              year: "numeric", // "2019"
            })}
          </span>
        </div>
        <div className='flex gap-3 items-center text-white'>
          <Icon className='text-lg' name='RiTimeLine' />

          <span>{readingTime} Min read</span>
        </div>
      </div>
    </>
  );
}

import React from "react";
import * as Styles from "styles/Footer.module.css";
import { Logo, Link, Heading, Icon } from "components";
import Image from "next/image";

export default function Footer({ data }) {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.wrapper}>
        <div className={Styles.description}>
          <div className={Styles.content}>
            <Link href='/'>
              <Logo width={8 * 18} color='white' />
            </Link>
            <p>
              Identify qualified leads & customers and increase your sales
              LeadBoxer is a Sales Enablement solution, allowing you to identify
              your most qualified Leads & Customers and get data driven insights
              into your sales and marketing workflow.
            </p>
          </div>
        </div>

        <Columns data={data} />
      </div>

      <Bottom />
    </footer>
  );
}

// Columns Wrapper
export function Columns({ data }) {
  return (
    <div className={Styles.columns}>
      <Column
        className='col-span-2'
        heading='LeadBoxer'
        items={data?.main?.menuItems?.nodes}
      />
      <Column
        className='col-span-4'
        heading='Integrations'
        innerColumns={2}
        items={data?.integrations?.nodes}
        linkPrefix='integrations'
      />
      <Column
        className='col-span-2'
        heading='Support'
        items={data?.support?.menuItems?.nodes}
      />
      <FooterPosts posts={data.latestPosts.edges} />
    </div>
  );
}

// Individual Columns
export function Column({
  items,
  className,
  heading,
  innerColumns,
  linkPrefix,
  ...props
}) {
  return (
    <div className={className}>
      <Heading className='text-white text-xl'>{heading}</Heading>

      <ul
        className={`mt-4 space-y-2 text-gray-300 ${
          innerColumns === 2 ? "grid grid-cols-2 gap-x-12" : ""
        }`}>
        {(items || []).map(({ id, title, slug }) => (
          <li key={id}>
            <Link className='text-gray-300' href={slug}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Footer Posts
export function FooterPosts({ posts, heading = "Latest Articles" }) {
  return (
    <div className='col-span-4'>
      <Heading className='text-white text-xl'>{heading}</Heading>

      <ul className='mt-4 space-y-4 text-gray-300'>
        {(posts || []).map(
          ({ node: { id, title, uri, featuredImage, author, categories } }) => {
            return (
              <li key={id} className='flex align-top space-x-4'>
                <div className='w-16 h-16 flex-none rounded-md overflow-hidden relative'>
                  <Link href={uri}>
                    {featuredImage && (
                      <Image
                        className='object-cover'
                        src={featuredImage?.node?.sourceUrl}
                        alt={
                          featuredImage?.node?.altText
                            ? featuredImage.node.altText
                            : `Leadboxer Featured Image for post: ${title}`
                        }
                        layout='responsive'
                        width={150}
                        height={150}
                      />
                    )}
                  </Link>
                </div>
                <div>
                  <Link
                    className=' text-gray-300 underline block font-semibold'
                    href={uri}>
                    {title}
                  </Link>
                  <div className='text-xs text-gray-500 mt-2'>
                    Posted by{" "}
                    <span className='text-gray-400'>{author.node.name}</span>{" "}
                    under{" "}
                    <span className='text-gray-400'>
                      {categories && categories?.nodes[0]?.name}
                    </span>
                  </div>
                </div>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}

export function Bottom() {
  const socialLinks = [
    {
      link: "https://twitter.com/lead_boxer",
      icon: "RiTwitterFill",
    },
    {
      link: "https://www.facebook.com/getleadboxer/",
      icon: "RiFacebookFill",
    },
    {
      link: "https://www.linkedin.com/company/leadboxer/",
      icon: "RiLinkedinFill",
    },
  ];

  return (
    <div className='bg-gray-800 bg-opacity-30 focus-within:relative'>
      <div
        className='p-0 w-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900'
        style={{ height: "1px" }}></div>

      <div className='container flex justify-between leading-loose w-full items-center'>
        <div className='py-8 text-gray-400 flex space-x-4 items-center text-sm'>
          <span>© LeadBoxer BV.</span>
          <ul className='flex bottom items-center space-x-4 m-0'>
            <li>
              <Link
                className='no-underline text-gray-400 hover:text-gray-100'
                href='/privacy'>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                className='no-underline text-gray-400 hover:text-gray-100'
                href='/terms-of-agreement'>
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div className='flex items-center leading-none space-x-4'>
          {socialLinks.map(({ link, icon }) => (
            <Link href={link} key={link}>
              <Icon
                key={icon}
                name={icon}
                className='text-gray-300 fill-current'
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

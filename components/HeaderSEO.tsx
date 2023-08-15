// SEO IMP Component
import Head from "next/head";
import React from "react";

export type HeadProps = {
  title: string | null;
  description: string | null;
};
export default function HeaderSEO({ title, description }: HeadProps) {
  return (
    <Head>
      {title ? (
        <title>{title}</title>
      ) : (
        <title>SkillSync Dashboard | Unleash Your Expertise and Bio</title>
      )}

      {!description ? (
        <meta
          name="description"
          content="Discover the Power of Skillsync Dashboard | Uncover Your Expertise, Experience, and Bio. Elevate Your Professional Profile with Comprehensive Insights. Explore Now!"
        />
      ) : (
        <meta name="description" content={description} />
      )}
      <meta
        name="keywords"
        content="Next.Js, React.Js, Coding-Journal, Redux"
      />
      <meta name="authur" content="Manji coder" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

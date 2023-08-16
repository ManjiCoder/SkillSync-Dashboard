import Image from "next/image";
import React from "react";

export default function BrandImage() {
  return (
    <Image
      src={"https://d1tl44nezj10jx.cloudfront.net/assets/logo_square.svg"}
      alt="ORU Phones"
      height={50}
      width={50}
      className="mx-auto h-10 w-auto"
    />
  );
}

import Link from "next/link";
function BrandHead() {
  return (
    <Link className={`text-xl xs:text-2xl font-bold`} href="/">
      Coding- Journal
    </Link>
  );
}

export default BrandHead;

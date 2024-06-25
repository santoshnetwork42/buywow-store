import { Heading, Text, Img } from "@/components/common";
import Link from "next/link";
import React from "react";

export default function Footer({ ...props }) {
  return (
    <footer
      {...props}
      className={`${props.className} flex self-stretch justify-center items-center py-6 bg-blue_gray-300_01`}
    >
      <div className="container-xs flex flex-wrap items-start justify-between gap-5 px-10">
        <div className="flex w-[18%] flex-col items-start gap-[50px]">
          <div className="flex flex-col gap-[25px] self-stretch">
            <div className="flex flex-col gap-2">
              <Img
                src="img_footer_logo.png"
                width={201}
                height={100}
                alt="footer logo"
                className="h-[50px] w-[201px] object-contain"
              />
              <Text as="p" className="leading-[130%] !text-white-a700_01">
                <>
                  Experience WOW Skin Science:
                  <br />
                  Pure, safe, and effective products free from harmful
                  ingredients.
                </>
              </Text>
            </div>
            <div className="flex gap-3.5">
              <Img
                src="img_facebook.svg"
                width={24}
                height={28}
                alt="facebook icon"
                className="h-[28px]"
              />
              <Img
                src="img_facebook.svg"
                width={21}
                height={28}
                alt="facebook icon"
                className="h-[28px]"
              />
              <Img
                src="img_facebook.svg"
                width={24}
                height={28}
                alt="facebook icon"
                className="h-[28px]"
              />
              <Img
                src="img_facebook.svg"
                width={21}
                height={28}
                alt="facebook icon"
                className="h-[28px]"
              />
              <Img
                src="img_facebook.svg"
                width={27}
                height={28}
                alt="facebook icon"
                className="h-[28px] w-[27px]"
              />
            </div>
          </div>
          <Text as="p" className="!text-white-a700_01">
            © wowskinsciences2024
          </Text>
        </div>
        <div className="flex w-[57%] flex-wrap items-start justify-between gap-5">
          <div className="flex flex-col gap-[9px]">
            <Heading as="h6" className="capitalize !text-white-a700_01">
              Products
            </Heading>
            <ul className="flex flex-col gap-[9px]">
              <li>
                <Link href="facewash" target="_blank" rel="noreferrer">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    facewash
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    hair oil
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="shampoo" target="_blank" rel="noreferrer">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    shampoo
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="serums" target="_blank" rel="noreferrer">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    serums
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="Sunscreen" target="_blank" rel="noreferrer">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    Sunscreen
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    face scrubs
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="conditioner" target="_blank" rel="noreferrer">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    conditioner
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="kids" target="_blank" rel="noreferrer">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    kids
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="nutrition" target="_blank" rel="noreferrer">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    nutrition
                  </Text>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-[9px]">
            <Heading as="h6" className="capitalize !text-white-a700_01">
              Shop By Ingrdients
            </Heading>
            <ul className="flex flex-col gap-[9px]">
              <li>
                <Link href="#">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    Vitamin C
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="onion" target="_blank" rel="noreferrer">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    onion
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="rosemary" target="_blank" rel="noreferrer">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    rosemary
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="ubtan" target="_blank" rel="noreferrer">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    ubtan
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="aloevera" target="_blank" rel="noreferrer">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    aloevera
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="hemp" target="_blank" rel="noreferrer">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    hemp
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    green tea
                  </Text>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-[9px]">
            <Heading
              as="h6"
              className="!font-intertight !font-bold !text-white-a700_01"
            >
              <span className="font-outfit font-semibold text-white-a700_01">
                Quick Links
              </span>
            </Heading>
            <ul className="flex flex-col gap-[9px]">
              <li>
                <Link href="#">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    Order & Shipping
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    Returns & Refunds
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    Contact Us
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="FAQs" target="_blank" rel="noreferrer">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    FAQs
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    Privacy Policy
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Text as="p" className="capitalize !text-white-a700_01">
                    Terms & Condition
                  </Text>
                </Link>
              </li>
            </ul>
          </div>
          <ul className="flex flex-col items-start gap-[9px]">
            <li>
              <Link href="Kits" target="_blank" rel="noreferrer">
                <Heading as="h6" className="capitalize !text-white-a700_01">
                  Kits
                </Heading>
              </Link>
            </li>
            <li>
              <Link href="#">
                <Heading as="h6" className="capitalize !text-white-a700_01">
                  Trial Packs
                </Heading>
              </Link>
            </li>
            <li>
              <Link href="Blogs" target="_blank" rel="noreferrer">
                <Heading as="h6" className="capitalize !text-white-a700_01">
                  Blogs
                </Heading>
              </Link>
            </li>
            <li>
              <Link href="#">
                <Heading as="h6" className="capitalize !text-white-a700_01">
                  About Us
                </Heading>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

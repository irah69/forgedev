"use client";
import IndianTime from "@/components/IndianTime";
function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4A8 8 0 1 1 20 12Z" />
      <path d="M8.8 9.4c.2-.5.5-.5.7-.5h.6c.2 0 .4.1.5.4l.7 1.8c.1.3 0 .5-.2.7l-.5.6c.5 1 1.3 1.8 2.3 2.3l.6-.5c.2-.2.5-.2.7-.1l1.7.7c.3.1.4.3.4.5v.6c0 .3-.1.6-.5.7-.5.2-1 .3-1.5.2-3.3-.7-5.9-3.3-6.6-6.6-.1-.5 0-1 .1-1.5Z" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </svg>
  );
}

export default function Footer() {



  return (
    <footer id="footer" className="bg-[#000000] text-[#ECE6DA]">
      <div className="mx-auto flex min-h-screen max-w-[1800px] flex-col justify-between px-8 py-16 lg:px-24">

        {/* Top */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">

          {/* Navigation */}
          <div>
            <ul className="space-y-6 font-[Cinzel] text-2xl uppercase tracking-wide">
              <li>
                <a href="#" className="transition hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/work" className="transition hover:text-white">
                  Work
                </a>
              </li>
              <li>
                <a href="/Tech" className="transition hover:text-white">
                  Tech Stack
                </a>
              </li>
              <li>
                <a href="Aboutus" className="transition hover:text-white">
                  Company
                </a>
              </li>
              <li>
                <a href="contact" className="transition hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Office */}
          <div>
            

            <div className="space-y-1 font-[Cinzel] text-xl uppercase leading-9 text-[#CFC7BA]">
              <p>Hyderabad</p>
              <p>Telangana</p>
              <p>India</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-[Cinzel] text-xl uppercase tracking-wider">
              CONTACT
            </h3>

          <div className="space-y-1 font-[Cinzel] text-xl uppercase leading-9 text-[#CFC7BA]">
  <a
    href="mailto:irahtech69@gmail.com"
    className="block transition-colors duration-300 hover:text-white"
  >
    irahtech69@gmail.com
  </a>

  <a
    href="tel:+9190144977622"
    className="block transition-colors duration-300 hover:text-white"
  >
    +91 9014497762
  </a>
</div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-start gap-5 lg:items-end">

            <a
              href="#"
              className="flex items-center gap-3 font-[Cinzel] text-xl uppercase transition hover:text-white"
            >
              WhatsApp
              <WhatsAppIcon />
            </a>

            <a
              href="https://www.instagram.com/irah.tech?igsh=Y3phdW9nYXdqYzZj&utm_source=qr"
              className="flex items-center gap-3 font-[Cinzel] text-xl uppercase transition hover:text-white"
            >
              Instagram
              <InstagramIcon />
            </a>
{/* 
            <a
              href="#"
              className="mt-8 font-[Cinzel] text-xl uppercase transition hover:text-white"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="font-[Cinzel] text-xl uppercase transition hover:text-white"
            >
              Terms & Conditions
            </a> */}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-24 flex flex-col gap-6 border-t border-white/10 pt-8 text-lg uppercase md:flex-row md:items-center md:justify-between">

          <span className="font-[Cinzel]">
           © {new Date().getFullYear()} IRAH TECH
          </span>

          <div className="flex flex-col gap-3 md:flex-row md:gap-10">
            <IndianTime />

            <span className="font-[Cinzel]">
              Building Digital Experiences
            </span>
          </div>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="flex items-center justify-end gap-2 font-serif transition hover:text-white"
          >
            TOP
            <ArrowUpIcon />
          </button>
        </div>
      </div>
    </footer>
  );
}
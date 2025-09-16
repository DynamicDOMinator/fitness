import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <div className="md:pt-50 pt-30 ">
        <div className="absolute top-[-50px] hidden md:block left-0 rounded-full 2xl:w-[700px] 2xl:h-[450px] w-[500px] h-[300px] bg-[#fd5747] opacity-40 blur-[100px] z-[1] pointer-events-none"></div>

        <div className="absolute top-[50px] right-0 2xl:w-[650px] rounded-full 2xl:h-[450px] w-[500px] h-[300px] bg-[#fd5747] opacity-40 blur-[100px] z-[1] pointer-events-none"></div>

        <div className="flex items-center justify-center relative z-[10]   ">
          <div className="lg:text-8xl md:text-6xl text-4xl  ">
            <h1 className="text-white  font-bold">
              SCULT{" "}
              <span className="bg-gradient-to-r from-[#fd5747] to-blue-700  bg-clip-text text-transparent">
                {" "}
                YOUR{" "}
              </span>{" "}
              BODY,
            </h1>

            <h2 className="text-white  font-bold pt-3">
              ELEVATE{" "}
              <span className="bg-gradient-to-r from-[#fd5747] to-blue-700  bg-clip-text text-transparent">
                {" "}
                YOUR{" "}
              </span>{" "}
              SPIRIT
            </h2>
          </div>
        </div>
        <div className="flex flex-row-reverse md:mt-50 mt-25 md:text-3xl   ">
          <div className="md:pr-10 2xl:pr-0 flex lg:flex-col  items-center justify-center  md:gap-10 gap-4  mx-auto md:mt-10 lg:mt-0 lg:mx-0">
            <button className="bg-[#fd5747] text-white md:px-5 md:py-2 p-2 rounded-full flex items-center gap-2">
              {" "}
              TRY FOR FREE{" "}
              <FaLongArrowAltRight
                className="
  text-2xl"
              />
            </button>{" "}
       
            <button className="bg-gray-500 text-white md:px-5 md:py-2 p-2 rounded-full lg:mt-10 flex items-center gap-2">
              LEARN MORE <FaLongArrowAltRight className="text-2xl" />
            </button>
          </div>

          <Image
            className="absolute left-1/2 transform -translate-x-1/2  lg:-top-15 top-[40] md:top-30 opacity-90 z-[10] w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:h-[1250px] lg:w-[1000px]"
            src="/hamo.png"
            alt="window"
            width={1000}
            height={1000}
          />
        </div>
      </div>

<div className="backdrop-blur-xl bg-black/20 bg-gradient-to-br from-[#fd5747]/10 to-blue-700/10">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:mt-64  mt-10  p-5 backdrop-blur-2xl">
        <div className="border-b-4 md:border-b-0 md:border-r-4 border-[#fd5747] pb-6 md:pb-0 md:pr-7">
          <h2 className="lg:text-3xl text-2xl text-[#fd5747]">
            +7 years experience{" "}
          </h2>
          <p className="text-white pt-2 text-lg">Served people in 6 differenet countries</p>
        </div>

        <div className="border-b-4 md:border-b-0 md:border-r-4 border-[#fd5747] pb-6 md:pb-0 md:pr-7">
          <h2 className="lg:text-3xl text-2xl text-[#fd5747]">
          Results-Driven Programs {" "}
          </h2>
          <p className="text-white pt-2 text-lg">Designed to help you see progress from week one.
</p>
        </div>
        
        <div>
          <h2 className="lg:text-3xl text-2xl text-[#fd5747]">
           Personalized Coaching{" "}
          </h2>
          <p className="text-white pt-2 text-lg">Workouts & nutrition tailored to your lifestyle</p>
        </div>
      </div>
</div>

     





















    </div>
  );
}

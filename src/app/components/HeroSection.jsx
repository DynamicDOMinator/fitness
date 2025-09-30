import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { CgGym } from "react-icons/cg";

export default function HeroSection() {
  return (
    <div>
      <div
        className="w-full h-full bg-gradient-to-r from-red-700 to-gray-700
      opacity-70 absolute rounded-br-full top-0 -left-30  "
      ></div>
      <div className="hero relative ">
        <div className="md:pt-50 pt-30 ">
          {/* <div className="absolute top-[-50px] hidden md:block left-0 rounded-full 2xl:w-[700px] 2xl:h-[450px] w-[500px] h-[300px] bg-[#fd5747] opacity-40 blur-[100px] z-[1] pointer-events-none"></div>

        <div className="absolute top-[50px] right-0 2xl:w-[650px] rounded-full 2xl:h-[450px] w-[500px] h-[300px] bg-[#fd5747] opacity-40 blur-[100px] z-[1] pointer-events-none"></div> */}

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
        



   <video 
              
                className="w-1/2 mt-30 mx-auto rounded-3xl shadow-[#fd5747] outline-8 outline-[#fd5747]  shadow-2xl h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover "
                src="/vid1.webm"
               controls
            
               
              />


        </div>

        <div className="backdrop-blur-xl bg-black/20  bg-gradient-to-br from-[#fd5747]/10 to-blue-700/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:mt-20  mt-10  p-5 backdrop-blur-2xl">
            <div className="flex items-center gap-5">
              <TiGroup className="text-5xl lg:text-6xl text-[#fd5747]" />

              <div className="border-b-4 md:border-b-0 md:border-r-4 border-[#fd5747] pb-6 md:pb-0 md:pr-7">
                <h2 className="lg:text-3xl text-xl text-[#fd5747]">
                  +7 years experience{" "}
                </h2>
                <p className="text-white pt-2  text-sm lg:text-lg">
                  Served people in 6 differenet countries
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <CgGym className="text-5xl lg:text-9xl text-[#fd5747]" />
              <div className="border-b-4 md:border-b-0 md:border-r-4 border-[#fd5747] pb-6 md:pb-0 md:pr-7">
                <h2 className="lg:text-3xl text-xl text-[#fd5747]">
                  Results-Driven Programs{" "}
                </h2>
                <p className="text-white pt-2  text-sm lg:text-lg">
                  Designed to help you see progress from week one.
                </p>
              </div>
            </div>

            <div>
              <h2 className="lg:text-3xl text-xl text-[#fd5747]">
                Personalized Coaching{" "}
              </h2>
              <p className="text-white pt-2 text-sm lg:text-lg">
                Workouts & nutrition tailored to your lifestyle
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

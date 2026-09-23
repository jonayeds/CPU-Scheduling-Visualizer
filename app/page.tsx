import Link from "next/link";
import Image from "next/image";
import bulb from "@/assets/doodles/doodle_bulb.png";
import cloud from "@/assets/doodles/doodle_cloud.png";
import message from "@/assets/doodles/doodle_message_1.png";
import pipeline from "@/assets/doodles/doodle_pipeline.png";
import pipelineTwo from "@/assets/doodles/doodle_pipeline_2.png";
import roundShape from "@/assets/doodles/doodle_round_shape.png";

export default function HomePage() {
  return (
    <main className="relative min-h-[calc(100svh-73px)] w-full overflow-hidden bg-background flex items-center justify-center px-4 py-6 md:min-h-[calc(100svh-69px)] md:p-8">
      {/* --- Doodle Assets --- */}

      {/* Top Left: Cloud */}
      <div className="absolute top-4 left-2 h-24 w-24 mix-blend-multiply sm:top-6 sm:left-6 sm:h-28 sm:w-28 md:top-20 md:left-56 md:h-36 md:w-36">
        <Image draggable={false} src={cloud} alt="cloud doodle" fill className="object-contain" />
      </div>

      {/* Top Right: Bulb */}
      <div className="absolute top-5 right-3 h-20 w-20 mix-blend-multiply rotate-12 sm:right-6 sm:h-24 sm:w-24 md:top-20 md:right-80 md:h-32 md:w-32">
        <Image draggable={false} src={bulb} alt="bulb doodle" fill className="object-contain" />
      </div>

      {/* Right Middle: Pipeline 2 */}
      <div className="absolute top-[42%] -right-3 h-28 w-28 xl:flex hidden -translate-y-1/2 mix-blend-multiply sm:right-40 sm:h-36 sm:w-36 md:h-44 md:w-44">
        <Image draggable={false} src={pipelineTwo} alt="pipeline doodle" fill className="object-contain" />
      </div>

      {/* Bottom Left: Message Bubble */}
      <div className="absolute bottom-16 left-2 h-28 w-28 mix-blend-multiply sm:left-6 sm:h-36 sm:w-36 md:bottom-40 md:left-56 md:h-44 md:w-44">
        <Image draggable={false} src={message} alt="message doodle" fill className="object-contain" />
        <span className="absolute inset-0 flex items-center justify-center font-hand text-sm font-bold text-foreground sm:text-base">
          Interactive!
        </span>
      </div>

      {/* Bottom Right: Round Shape */}
      <div className="absolute bottom-20  right-3 h-20 w-20 mix-blend-multiply sm:right-6 sm:h-28 sm:w-28 md:bottom-40 md:right-56 md:h-32 md:w-32">
        <Image draggable={false} src={roundShape} alt="round doodle" fill className="object-contain" />
      </div>

      {/* Bottom Center: Pipeline */}
      <div className="absolute bottom-20 left-1/2 h-16  w-full max-w-xl -translate-x-1/2 mix-blend-multiply sm:h-40 md:h-44">
        <Image  draggable={false}   src={pipeline} alt="pipeline base doodle" fill className="object-contain" />
      </div>

      {/* --- Central Content --- */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="mb-3 font-display text-[clamp(4.5rem,14vw,15rem)] font-bold leading-none">
          Visualize.
        </h1>
        <p className="mx-auto mb-7 max-w-md font-body text-base text-foreground/70 sm:text-lg md:mb-10 md:text-xl">
          Interactive CPU scheduling simulations to master OS concepts.
        </p>

        <div className="relative flex items-center gap-3 sm:gap-6">

          <Link
            href="/simulate"
            className="rounded-none border-4 border-black bg-primary-highlight px-5 py-3 text-base font-bold uppercase tracking-tight text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-1.25 active:translate-y-1.25 active:shadow-none sm:px-8 sm:py-4 sm:text-xl"
          >
            Start Simulation
          </Link>
        </div>
      </div>
    </main>
  );
}

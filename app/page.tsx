import Link from "next/link";
import Image from "next/image";
import bulb from "@/assets/doodles/doodle_bulb.png";
import cloud from "@/assets/doodles/doodle_cloud.png";
import calculator from "@/assets/doodles/doodle_calculator.png";
import arrowLeft from "@/assets/doodles/doodle_arrow_left.png";
import message from "@/assets/doodles/doodle_message_1.png";
import pipeline from "@/assets/doodles/doodle_pipeline.png";
import pipelineTwo from "@/assets/doodles/doodle_pipeline_2.png";
import roundShape from "@/assets/doodles/doodle_round_shape.png";
import scribbleLine from "@/assets/doodles/doodle_scrible_line.png";

export default function HomePage() {
  return (
    <main className="relative min-h-[calc(100svh-73px)] w-full overflow-hidden bg-background flex items-center justify-center px-4 py-6 md:min-h-[calc(100svh-73px)] md:p-8">
      {/* --- Doodle Assets --- */}

      {/* Top Left: Cloud */}
      <div className="absolute top-4 left-2 h-20 w-20 mix-blend-multiply sm:top-6 sm:left-6 sm:h-24 sm:w-24 md:top-14 md:left-[12%] md:h-28 md:w-28">
        <Image
          draggable={false}
          src={cloud}
          alt="cloud doodle"
          fill
          className="object-contain"
        />
      </div>

      {/* Top center: calculator */}
      <div className="absolute top-5 right-3 h-20 w-20 rotate-[-15deg] mix-blend-multiply sm:top-8 sm:right-8 sm:h-24 sm:w-24 md:top-12 md:right-[12%] md:h-28 md:w-28">
        <Image
          draggable={false}
          src={calculator}
          alt="calculator doodle"
          fill
          className="object-contain"
        />
      </div>

      {/* Right Middle: Pipeline 2 */}
      <div className="absolute top-[50%] -right-3 hidden h-24 w-24 -translate-y-1/2 mix-blend-multiply xl:flex sm:right-[8%] sm:h-28 sm:w-28 md:h-32 md:w-32">
        <Image
          draggable={false}
          src={pipelineTwo}
          alt="pipeline doodle"
          fill
          className="object-contain"
        />
      </div>

      {/* Bottom Left: Message Bubble */}
      <div className="absolute bottom-14 left-2 h-24 w-24 mix-blend-multiply sm:bottom-16 sm:left-8 sm:h-28 sm:w-28 md:bottom-[16%] md:left-[12%] md:h-32 md:w-32">
        <Image
          draggable={false}
          src={message}
          alt="message doodle"
          fill
          className="object-contain"
        />
        <span className="absolute inset-0 flex items-center justify-center font-hand text-xs font-bold text-foreground sm:text-sm">
          Interactive!
        </span>
      </div>

      {/* Bottom Right: Round Shape */}
      <div className="absolute bottom-16 right-3 h-16 w-16 mix-blend-multiply sm:bottom-20 sm:right-8 sm:h-20 sm:w-20 md:bottom-[18%] md:right-[13%] md:h-24 md:w-24">
        <Image
          draggable={false}
          src={roundShape}
          alt="round doodle"
          fill
          className="object-contain"
        />
      </div>

      {/* Bottom Center: Pipeline */}
      <div className="absolute bottom-10 left-1/2 h-12 w-[80%] max-w-md -translate-x-1/2 mix-blend-multiply sm:bottom-12 sm:h-16 md:bottom-[8%] md:h-20">
        <Image
          draggable={false}
          src={pipeline}
          alt="pipeline base doodle"
          fill
          className="object-contain"
        />
      </div>

      {/* Small accents frame the call to action without competing with the hero. */}
      <div className="absolute bottom-[27%] left-[28%] hidden h-10 w-16 -rotate-12 mix-blend-multiply md:block md:h-12 md:w-20">
        <Image draggable={false} src={arrowLeft} alt="left arrow doodle" fill className="object-contain" />
      </div>
      <div className="absolute bottom-[25%] right-[26%] hidden h-8 w-24 rotate-3 mix-blend-multiply md:block md:h-10 md:w-28">
        <Image draggable={false} src={scribbleLine} alt="scribble line doodle" fill className="object-contain" />
      </div>

      {/* --- Central Content --- */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="relative">
          <h1 className="mb-3 font-display text-[clamp(4.5rem,14vw,15rem)] font-bold leading-none">
            Visualiz
            <span className="relative inline-block">
              <span className="absolute top-[-0.45em] left-1/2 h-[0.8em] w-[0.8em] -translate-x-1/2">
                <Image
                  draggable={false}
                  src={bulb}
                  alt="bulb doodle"
                  fill
                  className="object-contain"
                />
              </span>
              e
            </span>
            .
          </h1>
        </div>
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

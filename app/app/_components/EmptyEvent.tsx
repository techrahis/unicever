import React from "react";
import EmptyEventSvg from "@/public/emptyevent.svg";
import Image from "next/image";
import * as uuid from "uuid";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
const EmptyEvent = () => {
  return (
    <div className="h-[70vh] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="md:h-[16rem] md:w-[16rem] h-[10rem] w-[10rem] overflow-hidden relative">
          <Image src={EmptyEventSvg} alt="empty-event" fill />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-sm text-muted-foreground text-center">
            Look like you haven&apos;t created any event. <br /> click create
            event to create a event
          </p>

          <Link
            href={`/app/events/${uuid.v4()}`}
            className={buttonVariants({
              variant: "secondary",
            })}
          >
            Create Event
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyEvent;

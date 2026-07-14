"use client";

import { SliceSimulator, getSlices } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";
import { components } from "../../slices";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SliceSimulatorContent() {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const slices = getSlices(state);

  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  );
}

export default function SliceSimulatorPage() {
  return (
    <Suspense>
      <SliceSimulatorContent />
    </Suspense>
  );
}

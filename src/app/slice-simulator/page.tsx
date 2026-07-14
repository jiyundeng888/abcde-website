"use client";

import { SliceSimulator, getSlices } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";
import { components } from "../../slices";
import { useState, useEffect } from "react";

export default function SliceSimulatorPage() {
  const [slices, setSlices] = useState<any[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const state = params.get("state");
    setSlices(getSlices(state));
  }, []);

  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  );
}

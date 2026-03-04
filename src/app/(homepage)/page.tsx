"use client";

import { Button } from "@/components/ui/button";
import { testFunction } from "../../../actions/test-function";

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <Button onClick={testFunction}>Test Function</Button>
    </div>
  );
}

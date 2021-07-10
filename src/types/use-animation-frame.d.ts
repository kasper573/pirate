declare module "use-animation-frame" {
  import { DependencyList } from "react";
  const hook = (
    callback: (time: { time: number; delta: number }) => void,
    deps: DependencyList
  ) => number;
  export default hook;
}

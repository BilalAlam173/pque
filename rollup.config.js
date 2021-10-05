export default {
  input: "dist/priorityQueue",
  output: [
    {
      dir: "bin/common",
      format: "cjs",
    },
    {
      dir: "bin/esm",
      format: "esm",
    },
  ],
};

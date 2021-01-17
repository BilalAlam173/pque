export default {
  input: "dist/priorityQueue",
  output: [
    {
      file: "bin/index.cjs",
      format: "cjs",
    },
    {
      file: "bin/index.ejs",
      format: "es",
    },
  ],
};

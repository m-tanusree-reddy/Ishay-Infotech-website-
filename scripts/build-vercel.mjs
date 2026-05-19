import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const outputRoot = resolve(root, ".vercel", "output");
const staticOutput = resolve(outputRoot, "static");
const frontendOutput = resolve(root, "artifacts", "ishay-infotech", "dist", "public");

function run(command, args, options = {}) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(
      process.platform === "win32" ? [command, ...args].join(" ") : command,
      process.platform === "win32" ? [] : args,
      {
        cwd: root,
        env: {
          ...process.env,
          PORT: process.env.PORT || "3000",
          BASE_PATH: process.env.BASE_PATH || "/",
        },
        shell: process.platform === "win32",
        stdio: "inherit",
        ...options,
      },
    );

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolveRun();
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
      }
    });
  });
}

await run("corepack", [
  "pnpm",
  "--filter",
  "@workspace/ishay-infotech",
  "run",
  "build",
]);

await rm(outputRoot, { recursive: true, force: true });
await mkdir(staticOutput, { recursive: true });
await cp(frontendOutput, staticOutput, { recursive: true });
await writeFile(
  resolve(outputRoot, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        { handle: "filesystem" },
        { src: "/.*", dest: "/index.html" },
      ],
    },
    null,
    2,
  ),
);

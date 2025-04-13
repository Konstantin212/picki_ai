import { NextResponse } from "next/server";
import { spawn } from "child_process";

export async function GET() {
  // Only allow this in development
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not available in production", { status: 404 });
  }

  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  // Run tsc in watch mode
  const tsc = spawn("pnpm", ["tsc", "--watch", "--noEmit"], {
    shell: true,
  });

  let buffer = "";

  tsc.stdout.on("data", (data) => {
    buffer += data.toString();

    // When we have a complete message
    if (buffer.includes("\n")) {
      const lines = buffer.split("\n");
      buffer = lines.pop() || ""; // Keep the incomplete line in the buffer

      const errors = lines
        .filter((line) => line.includes("error TS"))
        .map((line) => {
          const match = line.match(
            /(.+)\((\d+),(\d+)\):\s+error\s+TS\d+:\s+(.+)/,
          );
          if (match) {
            return {
              file: match[1],
              line: parseInt(match[2] ?? "0"),
              character: parseInt(match[3] ?? "0"),
              message: match[4],
            };
          }
          return null;
        })
        .filter(Boolean);

      if (errors.length > 0) {
        writer.write(encoder.encode(`data: ${JSON.stringify(errors)}\n\n`));
      }
    }
  });

  tsc.stderr.on("data", (data) => {
    console.error(`TypeScript Error: ${data}`);
  });

  tsc.on("close", () => {
    writer.close();
  });

  return new NextResponse(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

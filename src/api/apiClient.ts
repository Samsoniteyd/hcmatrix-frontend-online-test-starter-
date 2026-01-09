/**
 * A tiny mock API client that simulates network latency + occasional failures.
 * This is intentionally simplistic (and a bit imperfect) for the exercise.
 */
export type ApiError = { message: string; status?: number };

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withNetwork<T>(fn: () => T | Promise<T>): Promise<T> {
  // Simulate latency
  await sleep(250 + Math.random() * 450);

  // Simulate intermittent failures (about 10%)
  if (Math.random() < 0.10) {
    const err: ApiError = { message: "Random network error. Please retry.", status: 503 };
    throw err;
  }

  return await fn();
}

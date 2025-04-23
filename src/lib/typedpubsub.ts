import Redis from "ioredis";
import { createEventIterator } from "./event-iterator";
import { env } from "@/env";
import type { todo } from "@/server/db/schema";

export interface MyEvents {
  "todo:create": [
    organizationId: string,
    Partial<typeof todo.$inferSelect>,
    senderId: string,
  ];
  [key: `todo:update:${string}`]: Partial<typeof todo.$inferSelect>;
  [key: `todo:delete:${string}`]: Partial<typeof todo.$inferSelect>;
}

const pubClient = new Redis(env.REDIS_URL);
const subClient = new Redis(env.REDIS_URL);

export function createTypedPublisher<T extends MyEvents>() {
  return async function publish<K extends keyof T>(event: K, payload: T[K]) {
    await pubClient.publish(event as string, JSON.stringify(payload));
  };
}

export function createTypedSubscriber<T extends MyEvents>() {
  return function subscribe<K extends keyof T>(event: K) {
    return createEventIterator<T[K]>(({ emit, cancel }) => {
      const handler = (_channel: string, message: string) => {
        try {
          emit(JSON.parse(message));
        } catch (e) {
          console.error("Failed to parse message", e);
        }
      };

      subClient.subscribe(event as string);
      subClient.on("message", handler);

      return async () => {
        subClient.off("message", handler);
        await subClient.unsubscribe(event as string);
      };
    });
  };
}

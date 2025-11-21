import { useState, useEffect } from "react";
import { getSocket } from "@/lib/socket";
import type { Socket } from "socket.io-client";

interface SocketCallbacks {
  onFieldChange?: (data: unknown) => void;
}

export function useSocket(
  activityId: string,
  isNew: boolean,
  callbacks: SocketCallbacks = {}
) {
  const [activeUsers, setActiveUsers] = useState(0);
  const socket = getSocket();

  useEffect(() => {
    if (isNew || !activityId) return;

    const socketInstance = socket;

    socketInstance.emit("join-activity", activityId);

    socketInstance.on("activity-field-changed", (data: unknown) => {
      console.log("🔄 Received update:", data);
      callbacks.onFieldChange?.(data);
    });

    socketInstance.on("user-count", (count: number) => {
      setActiveUsers(count - 1);
    });

    socketInstance.on("user-joined", () => {
      console.log("👤 New user joined");
    });

    socketInstance.on("user-left", () => {
      console.log("👋 User left");
    });

    return () => {
      socketInstance.emit("leave-activity", activityId);
      socketInstance.off("activity-field-changed");
      socketInstance.off("user-count");
      socketInstance.off("user-joined");
      socketInstance.off("user-left");
    };
  }, [activityId, isNew]);

  return { socket, activeUsers };
}
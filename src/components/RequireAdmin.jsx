"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RequireAdmin({ children }) {
  const router = useRouter();
  const { isHydrated, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated) router.replace("/signin?next=/admin/dashboard");
    else if (!isAdmin) router.replace("/products");
  }, [isHydrated, isAuthenticated, isAdmin, router]);

  if (!isHydrated) return null;
  if (!isAuthenticated || !isAdmin) return null;
  return children;
}


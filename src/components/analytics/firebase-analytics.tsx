"use client";

import { useEffect } from "react";
import { getAnalytics, isSupported } from "firebase/analytics";
import { firebaseApp } from "@/lib/firebase";

/** Initializes Firebase Analytics client-side only, after confirming the browser supports it. */
export function FirebaseAnalytics() {
  useEffect(() => {
    isSupported().then((supported) => {
      if (supported) getAnalytics(firebaseApp);
    });
  }, []);

  return null;
}

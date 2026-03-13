import React, { Suspense } from "react";
import SignInClient from "./signin-client";

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="container-custom py-12">Loading…</div>}>
      <SignInClient />
    </Suspense>
  );
}

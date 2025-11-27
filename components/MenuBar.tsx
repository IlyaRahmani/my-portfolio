"use client";

import AppButton from "@/components/AppButton";

export default function MenuBar() {
  return (
    <div className="md:flex gap-4 p-4">
      <AppButton type="primary">About Me</AppButton>
      <AppButton type="secondary">Projects</AppButton>
      <AppButton type="secondary">Contact</AppButton>
    </div>
  );
}

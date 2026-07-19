"use client";

import { useEffect, useState } from "react";
import { Store, Bell, Palette, UserCog } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { data: session } = authClient.useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted
    ? document.documentElement.classList.contains("dark")
    : false;

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your store and account preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Store profile */}
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <Store className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Store Profile
            </h2>
          </div>
          <div className="space-y-4">
            <Field label="Store Name">
              <input className="form-input" defaultValue="LUXE" />
            </Field>
            <Field label="Contact Email">
              <input
                className="form-input"
                defaultValue={session?.user?.email || ""}
              />
            </Field>
            <button
              onClick={() => toast.success("Store profile saved")}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <Palette className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Appearance
            </h2>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Dark Mode</p>
              <p className="text-xs text-muted-foreground">
                Toggle the dashboard theme
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                isDark ? "bg-primary" : "bg-muted"
              }`}
              aria-label="Toggle theme"
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-background shadow transition-transform ${
                  isDark ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <Bell className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Notifications
            </h2>
          </div>
          <div className="space-y-3">
            <ToggleRow label="New order alerts" defaultOn />
            <ToggleRow label="Low stock warnings" defaultOn />
            <ToggleRow label="Weekly summary email" />
          </div>
        </div>

        {/* Account */}
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <UserCog className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Account
            </h2>
          </div>
          <div className="space-y-4">
            <Field label="Name">
              <input
                className="form-input"
                defaultValue={session?.user?.name || ""}
              />
            </Field>
            <Field label="Email">
              <input
                className="form-input"
                defaultValue={session?.user?.email || ""}
                disabled
              />
            </Field>
            <div className="flex items-center justify-between rounded-xl border border-border p-4">
              <div>
                <p className="text-sm font-medium text-foreground">Role</p>
                <p className="text-xs text-muted-foreground">
                  Your access level
                </p>
              </div>
              <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                {session?.user?.role || "user"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.form-input) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--border, #e5e7eb);
          background: transparent;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: inherit;
          outline: none;
        }
        :global(.form-input:focus) {
          border-color: var(--primary, #000);
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
        }
        :global(.form-input:disabled) {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}

function ToggleRow({ label, defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between rounded-xl border border-border p-4">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <button
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          on ? "bg-primary" : "bg-muted"
        }`}
        aria-label={label}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-background shadow transition-transform ${
            on ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

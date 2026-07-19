"use client";

import { authClient } from "@/lib/auth-client";
import { Mail, User as UserIcon } from "lucide-react";

export default function UserProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Profile
        </h1>
        <p className="mt-1 text-muted-foreground">
          Your personal account information.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
        <div className="flex items-center gap-4">
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="h-20 w-20 rounded-full border border-border object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-primary-foreground">
              {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {user?.name || "Customer"}
            </h2>
            <span className="mt-1 inline-flex rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {user?.role || "user"}
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-4">
            <div className="mb-1 flex items-center gap-2 text-muted-foreground">
              <UserIcon className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Name
              </span>
            </div>
            <p className="text-sm font-medium text-foreground">
              {user?.name || "—"}
            </p>
          </div>
          <div className="rounded-xl border border-border p-4">
            <div className="mb-1 flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Email
              </span>
            </div>
            <p className="text-sm font-medium text-foreground">
              {user?.email || "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

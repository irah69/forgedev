"use client";

import React, { useMemo, useState } from "react";
import RequireAdmin from "@/components/RequireAdmin";
import { useAuth } from "@/context/AuthContext";
import { adminApi } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { normalizePage } from "@/lib/pagination";

export default function AdminUsersPage() {
  const { accessToken } = useAuth();
  const [page, setPage] = useState(0);
  const size = 20;

  const usersQuery = useQuery({
    queryKey: ["adminUsers", { page, size }],
    enabled: Boolean(accessToken),
    queryFn: ({ signal }) => adminApi.getUsers({ token: accessToken, page, size }, signal),
  });

  const pageData = useMemo(() => normalizePage(usersQuery.data?.data ?? usersQuery.data), [usersQuery.data]);

  return (
    <RequireAdmin>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-light mb-8">Users</h1>

        {usersQuery.isError && (
          <div className="mb-4 p-3 border border-red-200 bg-red-50 text-red-700 rounded">
            Failed to load users. {usersQuery.error?.message ? `(${usersQuery.error.message})` : ""}
          </div>
        )}

        {usersQuery.isLoading ? (
          <div className="text-gray-600">Loading users…</div>
        ) : (
          <div className="overflow-auto border border-gray-200 rounded-lg">
            <table className="min-w-[800px] w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">Username</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Roles</th>
                </tr>
              </thead>
              <tbody>
                {pageData.items.map((u) => (
                  <tr key={u.id} className="border-t border-gray-200">
                    <td className="p-3">{u.id}</td>
                    <td className="p-3">{u.username || "—"}</td>
                    <td className="p-3">{u.email || "—"}</td>
                    <td className="p-3">
                      {Array.isArray(u.roles) ? u.roles.join(", ") : u.roles || u.authorities || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pageData.totalPages > 1 && (
          <div className="flex items-center justify-between mt-10">
            <button
              disabled={page <= 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <div className="text-sm text-gray-600">
              Page <span className="font-semibold">{page + 1}</span> of{" "}
              <span className="font-semibold">{pageData.totalPages}</span>
            </div>
            <button
              disabled={page + 1 >= pageData.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </RequireAdmin>
  );
}


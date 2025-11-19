import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PropsWithChildren } from "react";

export const AdminOnly = async ({ children }: PropsWithChildren) => {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
        redirect("/");
    }

    return children;
};

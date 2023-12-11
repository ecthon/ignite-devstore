import { Header } from "@/components/header";
import { ReactNode } from "react";

export default function StoreLayou({ children }: {children: ReactNode}) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}
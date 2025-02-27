"use client";

import { useEffect, useState } from "react";
import { getGoogleToken } from "@/settings/actions";

export default function Dashboard() {
    const [userDetails, setUserDetails] = useState<string | null>(null);

    const fetchUser = async () => {
        const token = await getGoogleToken();
        if (token) {
            setUserDetails(JSON.parse(token));
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <div>
            <h3>User Details: </h3>
            <h6>{userDetails}</h6>
        </div>
    );
}

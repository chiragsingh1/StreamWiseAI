"use client";

import { useEffect, useState } from "react";
import { getGoogleToken } from "@/app/settings/actions";

export default function Dashboard() {
    const [userDetails, setUserDetails] = useState<string | null>(null);

    const fetchUser = async () => {
        const token = await getGoogleToken();
        if (token) {
            setUserDetails(token);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <div>
            <h3>User Details: </h3>
            <h5>{JSON.stringify(userDetails)}</h5>
        </div>
    );
}

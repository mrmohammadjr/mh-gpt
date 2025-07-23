"use client"
import { useEffect } from "react";
import Swal from "sweetalert2";
// import 'sweetalert2/src/sweetalert2.scss'

const IpFounder = () => {
    async function ipUser(): Promise<void> {
        try {
            const res = await fetch("http://ip-api.com/json/");
            const { country } = await res.json();
            if (country === "Iran") {
                Swal.fire("For Iranian users , Please enable your VPN before using the application");
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        ipUser();
    }, []);

    return <div></div>;
};

export default IpFounder;
"use client"
import { useEffect } from "react";
import Swal from "sweetalert2";
// import 'sweetalert2/src/sweetalert2.scss'

const IpFounder = () => {
    async function ipUser() {
        Swal.fire("For Iranian users , Please enable your VPN before using the application");
    }
    useEffect(() => {
        ipUser();
    }, []);

    return <div></div>;
};

export default IpFounder;
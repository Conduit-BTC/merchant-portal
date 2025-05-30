import React, { useEffect, useRef, useState } from "react";
import { useAccountStore } from "@/stores/useAccountStore";
import { useStoreProfileStore } from "@/stores/useStoreProfileStore";
// import "./Header.css";
import '@/styles/typography.css'


const Header: React.FC = () => {
    const { user, isLoggedIn, logout } = useAccountStore();
    const { profile, fetchProfile } = useStoreProfileStore();

    const dropdownRef = useRef<HTMLDivElement>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [displayName, setDisplayName] = useState<string>("");

    const profileDisplayName = profile?.display_name || profile?.name || null;
    const profilePicture = profile?.picture || null;

    const formatNpub = (npub: string): string =>
        `${npub.substring(0, 8)}...${npub.substring(npub.length - 8)}`;

    const handleLogout = () => {
        logout();
    };

    // Innitial load
    useEffect(() => {
        (async () => {
            if (isLoggedIn && user?.pubkey) {
                await fetchProfile(user.pubkey);
            }
        })();
    }, [isLoggedIn, user?.pubkey, fetchProfile]);

    useEffect(() => {
        if (profileDisplayName) {
            setDisplayName(profileDisplayName);
        } else if (user?.npub) {
            setDisplayName(formatNpub(user.npub));
        }
    }, [profileDisplayName, user?.npub]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <section className="header h-[var(--header-height)] w-screen mx-auto px-4 flex justify-between items-center" style="margin-bottom:20px">
            {/* Logo/Title */}
            <div className="flex flex-col">
                <div className='flex'>
                    <svg viewBox="0 0 40 59" fill="none" xmlns="http://www.w3.org/2000/svg" style='padding:10px; width:10%;'>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M37.9638 21.6515C35.0042 23.1672 34.5114 25.457 34.5114 27.3671V31.8612C34.5114 32.7784 33.8091 33.5676 32.8961 33.6108C31.9215 33.6569 31.1168 32.8774 31.1168 31.9094V6.30239C31.1168 4.82854 29.9264 3.63381 28.4578 3.63381C26.9892 3.63381 25.7987 4.82854 25.7987 6.30239V28.1139C25.7987 29.0311 25.0963 29.8203 24.1834 29.8634C23.2087 29.9095 22.4041 29.1301 22.4041 28.162V2.6118C22.4041 1.16929 21.239 0 19.8016 0C18.3643 0 17.1991 1.16929 17.1991 2.6118V28.1139C17.1991 29.0311 16.4968 29.8203 15.5839 29.8634C14.6092 29.9095 13.8046 29.1301 13.8046 28.162V6.30239C13.8046 4.82854 12.6141 3.63381 11.1455 3.63381C9.67688 3.63381 8.48641 4.82854 8.48641 6.30239V31.8612C8.48641 32.7784 7.78407 33.5676 6.87116 33.6108C5.89647 33.6569 5.09185 32.8774 5.09185 31.9094V27.3671C5.09185 25.457 4.59907 23.1672 1.63946 21.6515C0.889602 21.2674 0 21.8217 0 22.6666V38.155C0 49.1753 8.88301 58.1409 19.8016 58.1409C30.7202 58.1409 39.6032 49.1753 39.6032 38.155V22.6666C39.6032 21.8217 38.7136 21.2674 37.9638 21.6515ZM21.132 33.9651C21.3919 34.0746 21.5478 34.3432 21.514 34.6232L20.7251 41.1621L26.4141 41.1621C26.6297 41.1621 26.8339 41.162 26.998 41.1774C27.1568 41.1923 27.4131 41.2298 27.6285 41.4101C27.8825 41.6227 28.0218 41.9382 28.0171 42.263C28.0131 42.5351 27.8843 42.7521 27.7946 42.8866C27.7021 43.0253 27.5725 43.1865 27.4337 43.3589L19.6304 53.06C19.4536 53.2798 19.1525 53.3558 18.8926 53.2463C18.6326 53.1367 18.4767 52.8682 18.5105 52.5882L19.2995 46.0493H13.6104H13.6104C13.3948 46.0493 13.1906 46.0493 13.0266 46.0339C12.8677 46.0191 12.6115 45.9816 12.3961 45.8013C12.1421 45.5886 12.0028 45.2731 12.0075 44.9484C12.0114 44.6762 12.1403 44.4593 12.23 44.3247C12.3225 44.186 12.4521 44.0249 12.5908 43.8524L20.3942 34.1514C20.571 33.9316 20.872 33.8556 21.132 33.9651Z" fill="#BB00FF" />
                    </svg>

                    <h1 className="booming-voice">
                        Merchant Portal
                    </h1>
                </div>
                <h5 className="attention-voice">Powered by Conduit</h5>
            </div>

            {/* Account Dropdown */}
            {isLoggedIn && (
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        {/* Avatar */}
                        {profilePicture ? (
                            <img
                                src={profilePicture}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover border border-gray-300"
                                style="width:100px; height:100px;"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                                {displayName ? displayName.charAt(0).toUpperCase() : "N"}
                            </div>
                        )}

                        <span className="hidden sm:inline text-sm  firm-voice">
                            {displayName || formatNpub(user?.npub || "xxx")}  {/* TODO */}
                        </span>

                        {/* Dropdown Arrow */}
                        <svg
                            className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1">
                                <div className="px-4 py-2 border-b">
                                    <p className="text-xs text-gray-500">Signed in as</p>
                                    <p className="text-sm font-medium text-gray-800 truncate">
                                        {formatNpub(user?.npub || "xxx")} {/* TODO */}
                                    </p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default Header;

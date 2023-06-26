"use client";
import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";

function Header() {
    return (
        <header>
            <div className="flex flex-col  md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">

                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-sm filter blur-3xl opacity-50 -z-50" />
                {/* bg-gradient-to-br from-pink-400 to-[#0055D1] */}
                {/* filter blur-3xl  => chuyển màu và làm mờ */}
                {/* opacity-50 => độ mờ */}
                {/* -z-50 => đẩy xuống dưới */}



                <Image
                    src={"https://links.papareact.com/c2cdd5"}
                    width={300}
                    height={100}
                    className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
                    alt="trello logo"
                />

                <div className="flex items-center flex-1 space-x-5 justify-end ">
                    {/* search box */}
                    <form className="flex  items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />

                        <input
                            placeholder="search"
                            type="text"
                            className="flex-1 outline-none p-2 "
                        />
                        <button type="submit" hidden>
                            Search
                        </button>
                    </form>
                    {/* avatar */}

                    <Avatar name="Louis Le" round color="#0055D1" size="50" />
                </div>
            </div>
            <div className="flex items-center justify-center px-5 md:py-5 ">
                <p className="flex items-center text-sm font-light pr-5 shadow-xl p-5
                rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]  ">
                    <UserCircleIcon className="inline-block h-10 w-10 text-[#0055D1] mr-1 " />
                    CHAT GPT thinking something like this
                </p>
            </div>
        </header>
    );
}

export default Header;

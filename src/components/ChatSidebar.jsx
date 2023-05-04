import { where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { withTranslation } from "next-i18next";
import { useEffect } from "react";
import { useQuery } from "react-query";

// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAuth } from "@/components/context/AuthContext";

import getDocument from "@/firebase/getData";
import { getMyPeer } from "@/utils/getPeer";

import ChatItem from "./ChatItem";
const ChatSidebar = (props) => {
    const { chatRef, lastMsgLive, t } = props;
    const { user } = useAuth();
    const router = useRouter();
    const redirect = (id) => {
        router.push(`/chats/${id}`);
    };
    const { data: chatsOfCurrentUser } = useQuery(
        "setChatsOfCurrentUser",
        async () => {
            try {
                const chats = await getDocument(
                    "chats",
                    where("users", "array-contains", user?.uid)
                );
                return chats;
            } catch (error) {
                //
            }
        }
    );

    return (
        <div className='w-full lg:w-3/6 xl:w-2/6 flex flex-col justify-start items-stretch  bg-white bg-opacity-80 rounded-md lg:rounded-none lg:rounded-l-md'>
            <div className='w-full bg-background/80 border-b-[3px] border-gray/20 px-5 h-[4rem] inline-flex items-center justify-center'>
                <input
                    type='text'
                    placeholder={t("search")}
                    className=' placeholder-gray/50 text-gray/80 text-sm py-2 px-10 rounded-full outline-none w-full focus:outline-none'
                />
            </div>
            <ul className='overflow-y-auto'>
                {chatsOfCurrentUser &&
                    chatsOfCurrentUser.map((chat) => {
                        return (
                            <>
                                <li
                                    key={Math.random()}
                                    onClick={() => redirect(chat.id)}
                                    className={`py-2 px-5 flex flex-row cursor-pointer hover:bg-gray/20 ${
                                        chat.id === chatRef && "bg-cyan/60"
                                    }`}
                                >
                                    <ChatItem
                                        chat={chat}
                                        peerId={getMyPeer(chat.users, user)}
                                        currentUser={user}
                                    />
                                </li>
                                <li className='border-b-2 border-light-gray/20'></li>
                            </>
                        );
                    })}
            </ul>
        </div>
    );
};

export default withTranslation("chatroom")(ChatSidebar);

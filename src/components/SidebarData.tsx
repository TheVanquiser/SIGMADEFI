import React from 'react'
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
export const SidebarData = [
    {
        title: 'Multi Sender',
        path: '/multisender',
        icon: <MdIcons.MdSend />
    },
    {
        title: 'Create DIP-20',
        path: '/create-token',
        icon: <MdIcons.MdOutlineGeneratingTokens />
    },
    {
        title: 'Generate NFT',
        path: '/generate-nft',
        icon: <AiIcons.AiFillPicture />
    },
    {
        title: 'Buy ICP',
        path: '/buy-icp',
        icon: <BsIcons.BsCreditCard />
    }
]


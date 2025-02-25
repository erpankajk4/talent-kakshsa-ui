import { IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import {
  LuLayoutDashboard,
  LuMessagesSquare,
  LuUserPlus,
} from "react-icons/lu";

export const community = {
  tabs: [
    {
      id: "1",
      label: "feeds",
      icon: <LuLayoutDashboard />,
    },
    {
      id: "2",
      label: "messages",
      icon: <LuMessagesSquare />,
    },
    {
      id: "3",
      label: "community",
      icon: <IoPeopleOutline />,
    },
    {
      id: "4",
      label: "my-profile",
      icon: <CgProfile />,
    },
  ],
};

export const profileTab = [
  {
    id: 11,
    label: "feeds",
  },
  {
    id: 12,
    label: "about",
  },
  {
    id: 13,
    label: "community",
  },
  {
    id: 14,
    label: "experience",
  },
  {
    id: 15,
    label: "skills",
  },
];

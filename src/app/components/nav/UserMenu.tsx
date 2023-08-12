import { signOut } from "next-auth/react";
import React from "react";

type UserMenuProps = {
  name: string;
  email: string;
  image?: string | null;
};

function UserMenu(props: UserMenuProps) {
  const { name, email, image } = props;

  const avatarSrc =
    image ?? `https://ui-avatars.com/api/?name=${name.split(" ").join("+")}`;
  const avatarImage = <img src={avatarSrc} />;

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="avatar flex hover:cursor-pointer">
        <div className="w-8 h-8 rounded-full">{avatarImage}</div>
      </div>
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box">
        <li>
          <div className="flex flex-row gap-2">
            <div className="avatar flex">
              <div className="w-8 h-8 rounded-full">{avatarImage}</div>
            </div>
            <button className="flex flex-col items-start">
              <div className="text-md leading-4">{name}</div>
              <div className="text-xs leading-4">{email}</div>
            </button>
          </div>
        </li>
        <div className="divider my-1" />
        <li>
          <button onClick={() => signOut()}>Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;

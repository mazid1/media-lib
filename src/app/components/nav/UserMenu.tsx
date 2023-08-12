import React from "react";

function UserMenu() {
  return (
    <div className="flex items-center gap-1">
      <div className="avatar flex">
        <div className="w-8 h-8 rounded-full">
          <img src="https://ui-avatars.com/api/?name=Mazedul+Islam" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-md leading-4">Mazedul Islam</div>
        <div className="text-sm leading-4">mazidmailbox@gmail.com</div>
      </div>
    </div>
  );
}

export default UserMenu;

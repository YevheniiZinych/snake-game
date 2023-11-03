import toast from "react-hot-toast";

export const checkName = (name, players) => {
  const isPlayerExist = players.filter((item) => item.name === name);

  console.log(isPlayerExist);

  if (isPlayerExist.length >= 1) {
    toast.error(`This name ${name} already exists`);
    return true;
  } else if (isPlayerExist.length === 0) {
    toast.success("Good luck");
    return false;
  }
};

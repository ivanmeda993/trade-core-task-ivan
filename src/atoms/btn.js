import { atom } from "recoil";

export const btnStateRecoil = atom({
  key: "BtnState",
  default: {
    nextBtn: true,
    btnDirection: "next",
    btnDirectionBack: "back",
    isAddForm: false,
  },
});

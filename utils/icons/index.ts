export * from "./navigation";
export * from "./actions";
export * from "./social";
export * from "./shop";
export * from "./ui";
export * from "./layout";

import * as Navigation from "./navigation";
import * as Actions from "./actions";
import * as Social from "./social";
import * as Shop from "./shop";
import * as UI from "./ui";
import * as Layout from "./layout";

export const Icons = {
  ...Navigation,
  ...Actions,
  ...Social,
  ...Shop,
  ...UI,
  ...Layout,
};

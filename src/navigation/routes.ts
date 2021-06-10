export const HOME_ROOT_ROUTES = {
  HOME: 'Home',
} as const;

type valueof<T> = T[keyof T];

export type HomeRootRoutes = valueof<typeof HOME_ROOT_ROUTES>;

export type RootRoutes = HomeRootRoutes;
export type AllRoutes = RootRoutes;

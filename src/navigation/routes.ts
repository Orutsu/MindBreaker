export const DASHBOARD_ROOT_ROUTES = {
  TREE: 'Tree',
  GOAL: 'Goal',
  ARCHIVE: 'Archive',
} as const;

export const TREE_ROUTES = {
  MAIN_TREE: 'Main_Tree',
  NEW_ITEM: 'New_Item',
} as const;

export const GOAL_ROUTES = {
  MAIN_GOAL: 'Main_Goal',
} as const;

export const ARCHIVE_ROUTES = {
  MAIN_ARCHIVES: 'Main_Archive',
} as const;

type valueof<T> = T[keyof T];

export type DashboardRootRoutes = valueof<typeof DASHBOARD_ROOT_ROUTES>;
export type TreeRoutes = valueof<typeof TREE_ROUTES>
export type GoalRoutes = valueof<typeof GOAL_ROUTES>
export type ArchiveRoutes = valueof<typeof ARCHIVE_ROUTES>

export type ChildrenRoutes = TreeRoutes | GoalRoutes | ArchiveRoutes;
export type RootRoutes = DashboardRootRoutes;
export type AllRoutes = ChildrenRoutes | RootRoutes;

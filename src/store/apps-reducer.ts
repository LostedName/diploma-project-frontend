import { v1 } from "uuid";

const initialState: OAuthAppsType[] = [
  {
    id: v1(),
    name: "App",
    appUrl: "https://vk.com",
    description: "Description Description",
    authUrl: "https://vk.com",
  },
  {
    id: v1(),
    name: "App 2",
    appUrl: "https://vk.com",
    description: "Description Description Description Description",
    authUrl: "https://vk.com",
  },
];

export const appsReducer = (
  state: OAuthAppsType[] = initialState,
  action: AppActionsType
): OAuthAppsType[] => {
  switch (action.type) {
    case "ADD-APP":
      return [
        ...state,
        {
          id: v1(),
          name: action.name,
          appUrl: action.appUrl,
          authUrl: action.authUrl,
          description: action.description,
        },
      ];
    default:
      return state;
  }
};

export const addAppAC = (name: string, appUrl: string, description: string, authUrl: string) => {
  return { type: "ADD-APP", name, appUrl, description, authUrl } as const;
};

export type AppActionsType = ReturnType<typeof addAppAC>;

export type OAuthAppsType = {
  id: string;
  name: string;
  appUrl: string;
  description: string;
  authUrl: string;
};

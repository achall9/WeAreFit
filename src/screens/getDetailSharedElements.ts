import type { SharedElementsComponentConfig } from "react-navigation-shared-element";

export const getDetailSharedElements: SharedElementsComponentConfig = (
  route,
  otherRoute,
  showing
) => {
  const {data} = route.params;
  return [
    {
      id: `item.${data.id}.image_url`,
      animation: 'move',
      resize: 'clip',
    },
    {
      id: `item.${data.id}.title`,
      animation: 'fade',
      resize: 'clip',
    },
    {
      id: `item.${data.id}.description`,
      animation: 'fade',
      resize: 'clip',
    },
  ];
};

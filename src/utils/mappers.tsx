import { Avatar } from "@mui/material";
import { BaseObjectResponse } from "../models/CharacterResponse";

export const mapApiDataToTable = <DataTypeSource, DataType>(
  apiData: DataTypeSource[]
): DataType[] => {
  const nameKey: string = "name";
  const avatarKey: string = "image";
  const originKey: string = "origin";
  const locationKey: string = "origin";

  return apiData.map((item: DataTypeSource) => {
    const alt = item[nameKey as keyof DataTypeSource] as string;
    const src = item[avatarKey as keyof DataTypeSource] as string;

    const origin = item[originKey as keyof DataTypeSource] as BaseObjectResponse;
    const location = item[locationKey as keyof DataTypeSource] as BaseObjectResponse;

    return {
      ...item,
      image: <Avatar alt={alt} src={src} />,
      origin: origin.name,
      location: location.name,
    };
  });
};

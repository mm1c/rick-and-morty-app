import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import character from "../../../data/characters/1";
import ProfileData from "./ProfileData";
import { DataMeta } from "../../../models/DataMeta";
import { mapApiDataToTable } from "../../../utils/mappers";

const profileMeta: DataMeta[] = [
  { key: "name", value: "Name" },
  { key: "species", value: "Species" },
  { key: "status", value: "Status" },
  { key: "gender", value: "Gender" },
  { key: "origin", value: "Origin" },
  { key: "location", value: "Location" },
];

const profileData = mapApiDataToTable([character])

describe("ProfileData", () => {
  it("should show an avatar", async () => {
    render(<ProfileData profileMeta={profileMeta} profileData={profileData} />);
    const avatar = screen.getByTestId("avatar");
    expect(avatar).toBeInTheDocument();
  });

  it("should show all the data", async () => {
    render(<ProfileData profileMeta={profileMeta} profileData={profileData} />);
    const properties = screen.getAllByTestId("profile_data_row");
    expect(properties).toHaveLength(profileMeta.length);
  });
});

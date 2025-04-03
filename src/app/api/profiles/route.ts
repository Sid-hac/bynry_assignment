import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "profiles.json");

export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newUser = await req.json();
    const data = await fs.readFile(filePath, "utf-8");
    const profiles = JSON.parse(data);

    const updatedProfiles = [...profiles, { id: Date.now(), ...newUser }];
    await fs.writeFile(filePath, JSON.stringify(updatedProfiles, null, 2));

    return NextResponse.json(updatedProfiles, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
  }
}

// Define the Profile interface
interface Profile {
  id: number;
  [key: string]: unknown; // Adjust this to match the structure of your profiles
}

export async function PUT(req: Request) {
  try {
    const updatedUser = await req.json();
    const data = await fs.readFile(filePath, "utf-8");
    let profiles = JSON.parse(data);

    profiles = profiles.map((profile: Profile) =>
      profile.id === updatedUser.id ? updatedUser : profile
    );

    await fs.writeFile(filePath, JSON.stringify(profiles, null, 2));
    return NextResponse.json(profiles);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const data = await fs.readFile(filePath, "utf-8");
    let profiles = JSON.parse(data);

    profiles = profiles.filter((profile: { id: unknown; }) => profile.id !== id);
    await fs.writeFile(filePath, JSON.stringify(profiles, null, 2));

    return NextResponse.json(profiles);
  } catch {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

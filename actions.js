"use server";

import { supabase } from "@/supabase";
import { currentUser } from "@clerk/nextjs/server";
import { uploadCapsuleFile } from "./app/services/supabaseService";
import { revalidatePath } from "next/cache";

export async function createCapsule(data) {
  try {
    const { name, description, unlockDate, notes, filePath } = data;
    const user = await currentUser();
    const ownerId = user?.id;

    const { data: insertData, error } = await supabase.from("capsules").insert({
      name,
      description,
      notes: notes || null,
      filePath,
      ownerId,
      unlockDate,
    });
    revalidatePath("/dashboard");
    return insertData;
  } catch (err) {
    console.error("Error creating capsule:", err.message);
    throw new Error("Failed to create capsule.");
  }
}

export async function getCapsules(userId) {
  try {
    const { data, error } = await supabase
      .from("capsules")
      .select()
      .eq("ownerId", userId);
    if (error) throw new Error(error.message);
    return data;
  } catch (err) {
    console.error("Error fetching capsules:", err.message);
    throw new Error("Failed to fetch capsules.");
  }
}
export async function getAllCapsules() {
  try {
    const { data, error } = await supabase.from("capsules").select("*");
    if (error) throw new Error(error.message);
    return data;
  } catch (err) {
    console.error("Error fetching capsules:", err.message);
    throw new Error("Failed to fetch capsules.");
  }
}

// Fetch capsules by IDs
export async function getCapsulesByIds(capsuleIds) {
  try {
    const { data, error } = await supabase
      .from("capsules")
      .select("*")
      .in("id", capsuleIds);

    if (error) throw new Error(error.message);
    return data;
  } catch (err) {
    console.error("Error fetching capsules by IDs:", err.message);
    return [];
  }
}

export async function getCapsuleById(id) {
  try {
    const { data, error } = await supabase
      .from("capsules")
      .select()
      .eq("id", id)
      .single();

    return { data, error };
  } catch (err) {
    console.error("Error fetching capsule:", err.message);
    throw new Error("Failed to fetch capsule.");
  }
}

// export async function getUsers() {
//   let { data: users, error } = await supabase.from("users").select("*");

//   if (error) {
//     console.error("Error fetching users:", error.message);
//     throw new Error("Failed to fetch users.");
//   }

//   return { users, error };
// }

export async function getUsers(searchQuery = "") {
  if (!searchQuery.trim()) return { users: [], error: null }; // No API call if search query is empty

  let { data: users, error } = await supabase
    .from("users")
    .select("*")
    .ilike("username", `%${searchQuery}%`); // Case-insensitive search

  if (error) {
    console.error("Error fetching users:", error.message);
    return { users: [], error };
  }

  return { users, error };
}

export async function updateCapsule({ capsuleData, id }) {
  try {
    const { data, error } = await supabase
      .from("capsules")
      .update(capsuleData)
      .eq("id", id)
      .select();

    if (error) {
      throw new Error(`Error updating capsule: ${error.message}`);
    }
    revalidatePath("/dashboard");

    return data;
  } catch (err) {
    console.error("Update failed:", err);
    throw err; // Re-throw for the caller to handle
  }
}

export async function shareCapsule(capsuleId, sharedBy, sharedWith) {
  // Input validation
  if (!capsuleId || !sharedBy || !sharedWith || !Array.isArray(sharedWith)) {
    throw new Error(
      "Invalid input: capsuleId, sharedBy, and sharedWith are required."
    );
  }

  try {
    // Prepare data for batch insertion
    const sharedCapsulesData = sharedWith.map((userId) => ({
      capsuleId,
      sharedBy,
      sharedWith: userId,
    }));

    // Insert shared capsule records
    const { data, error } = await supabase
      .from("sharedCapsules")
      .insert(sharedCapsulesData);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error };
  } catch (err) {
    console.error("Error sharing capsule:", err.message);
    return { data: null, error: err.message };
  }
}

export async function getSharedCapsules(userId) {
  try {
    const { data, error } = await supabase
      .from("sharedCapsules")
      .select("*")
      .or(`sharedWith.eq.${userId},sharedBy.eq.${userId}`);

    if (error) throw new Error(error.message);

    return data;
  } catch (err) {
    console.error("Error fetching shared capsules:", err.message);
    return [];
  }
}

export async function getSharedWithList(capsuleId) {
  const { data, error } = await supabase
    .from("sharedCapsules")
    .select(
      `sharedWith, users:sharedWith ( id, username, email )` // Ensure proper relation aliasing
    )
    .eq("capsuleId", capsuleId);

  if (error) {
    console.error("Error fetching shared with details:", error.message);
    throw new Error(error.message);
  }

  return data;
}

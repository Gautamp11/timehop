import { supabase } from "@/supabase";

export const syncUserFromClerk = async (clerkUser) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .upsert(clerkUser, { onConflict: "id" })
      .select();

    if (error) {
      console.error("Error syncing user to Supabase:", error.message);
      return;
    }

    console.log("User synced successfully:", data);
  } catch (err) {
    console.error("Unexpected error syncing user:", err.message);
  }
};

export async function uploadCapsuleFile(file) {
  let filePath = null;
  try {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("capsules")
      .upload(
        // `user-${user.id.trim(5)}/${Date.now()}-${file.name.toLowerCase()}`,
        `capsule-${Date.now()}-${file.name.toLowerCase()}`,
        file
      );

    if (uploadError) throw new Error(uploadError.message);

    // console.log("Upload data:", uploadData);
    filePath = uploadData.path;
    // console.log(filePath);

    let publicUrl = `https://fapzspalbjziliwycaij.supabase.co/storage/v1/object/public/capsules/${filePath}`;
    // console.log(publicUrl);

    return publicUrl; // Return the public URL
  } catch (err) {
    console.error("Error uploading file:", err.message);
    throw new Error("Failed to upload file.");
  }
}

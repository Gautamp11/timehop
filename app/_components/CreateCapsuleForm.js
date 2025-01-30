import React from "react";
import { useForm } from "react-hook-form";
import { createCapsule, updateCapsule } from "@/actions"; // Import server actions
import { uploadCapsuleFile } from "../services/supabaseService";
import useFramerMotion from "../_utils/useFramerMotion";
import { motion } from "framer-motion";

function CreateCapsuleForm({ onClose, editCapsule }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: editCapsule
      ? {
          name: editCapsule.name,
          description: editCapsule.description,
          notes: editCapsule.notes,
          unlockDate: editCapsule.unlockDate,
        }
      : {},
  });

  const { containerVariants, capsuleVariants } = useFramerMotion();

  async function onSubmit(data) {
    try {
      let filePath = editCapsule ? editCapsule.filePath : null;

      // Handle file upload if a new file is provided
      if (data.file && data.file[0]) {
        const file = data.file[0];
        filePath = await uploadCapsuleFile(file);
      }

      const capsuleData = {
        name: data.name,
        description: data.description,
        notes: data.notes || null,
        filePath,
        unlockDate: data.unlockDate,
      };

      if (editCapsule) {
        // Update the capsule if in edit mode
        await updateCapsule({ capsuleData, id: editCapsule.id });
      } else {
        // Create a new capsule if in create mode
        await createCapsule(capsuleData);
      }

      reset();
      onClose();
    } catch (err) {
      console.log("Error:", err.message);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 mt-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-2xl font-bold text-primary-50 mb-2">
        {editCapsule ? "Edit Capsule ✏️" : "Create Capsule 💟"}
      </h2>
      <input
        type="text"
        placeholder="Capsule Name"
        {...register("name", { required: "Capsule name is required" })}
        className="p-2 rounded-md bg-primary-800 text-primary-50 outline-none"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <textarea
        placeholder="Description"
        {...register("description", { required: "Description is required" })}
        className="p-2 rounded-md bg-primary-800 text-primary-50 outline-none"
      />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}
      <textarea
        placeholder="Keep a note with data or just wanna send a note?"
        {...register("notes")}
        className="p-2 rounded-md bg-primary-800 text-primary-50 outline-none"
      />
      <input
        type="file"
        {...register("file")}
        className="p-2 rounded-md bg-primary-800 text-primary-50"
      />
      {errors.file && <p className="text-red-500">{errors.file.message}</p>}
      <input
        type="date"
        {...register("unlockDate", { required: "Unlock date is required" })}
        className="p-2 rounded-md bg-primary-800 text-primary-50"
      />
      {errors.unlockDate && (
        <p className="text-red-500">{errors.unlockDate.message}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-accent-500 text-primary-50 py-2 px-4 rounded-md font-semibold hover:bg-accent-600"
      >
        {!isSubmitting
          ? editCapsule
            ? "Save Changes"
            : "Create"
          : editCapsule
          ? "Saving..."
          : "Creating..."}
      </button>
    </motion.form>
  );
}

export default CreateCapsuleForm;

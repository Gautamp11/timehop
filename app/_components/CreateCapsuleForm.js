import React from "react";
import { useForm } from "react-hook-form";
import { createCapsule } from "@/actions"; // Import server action

// import { useCapsules } from "../_contexts/CapsulesContext";
import { uploadCapsuleFile } from "../services/supabaseService";

function CreateCapsuleForm({ onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // const { addCapsules } = useCapsules();

  async function onSubmit(data) {
    try {
      let filePath = null;

      // handle file upload
      if (data.file && data.file[0]) {
        console.log("File found", data.file[0]);
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

      await createCapsule(capsuleData);

      reset();
      onClose();
    } catch (err) {
      console.log("Error creating capsule:", err.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 mt-4"
    >
      <h2 className="text-2xl font-bold text-primary-50 mb-2">
        Create Capsule 💟
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
      )}{" "}
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
        className="bg-accent-500 text-primary-50 py-2 px-4 rounded-md font-semibold hover:bg-accent-600"
      >
        Create
      </button>
    </form>
  );
}

export default CreateCapsuleForm;

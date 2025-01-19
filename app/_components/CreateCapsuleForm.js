import React from "react";
import { useForm } from "react-hook-form";
import { useCapsules } from "../_contexts/CapsulesContext";

function CreateCapsuleForm({ onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { addCapsules } = useCapsules();

  function onSubmit(data) {
    // console.log(data);
    addCapsules(data);
    reset();
    onClose();
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
        {...register("title", { required: "Capsule name is required" })}
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

      <input
        type="file"
        {...register("image")}
        className="p-2 rounded-md bg-primary-800 text-primary-50 "
      />
      {errors.image && <p className="text-red-500">{errors.image.message}</p>}

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

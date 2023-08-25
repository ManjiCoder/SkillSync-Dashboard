import React, { useState } from "react";
import ModalUI from "./headlessUI/ModalUI";
import FormHelper from "./FormHelper";
import { formFields } from "@/utils/form";

type ButtonProp = {
  fieldKey: string;
};

export function EditButton({ fieldKey }: ButtonProp) {
  const fieldName = formFields.has(fieldKey)
    ? formFields.get(fieldKey).fieldName
    : fieldKey;
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        className="py-1 text-xs font-medium px-4 rounded-full shadow-sm bg-purple-200"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>
      {showModal && (
        <ModalUI
          isOpen={showModal}
          closeModal={closeModal}
          title={`Edit ${fieldName}`}
        >
          <FormHelper
            fieldName={fieldName}
            fieldKey={fieldKey}
            closeModal={closeModal}
          />
        </ModalUI>
      )}
    </>
  );
}

export function AddButton({ fieldKey }: ButtonProp) {
  const fieldName = formFields.has(fieldKey)
    ? formFields.get(fieldKey).fieldName
    : fieldKey;
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        className="py-1 text-xs font-medium px-4 rounded-full shadow-sm bg-purple-200"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add
      </button>
      {showModal && (
        <ModalUI
          isOpen={showModal}
          closeModal={closeModal}
          title={`Add ${fieldName}`}
        >
          <FormHelper
            fieldName={fieldName}
            fieldKey={fieldKey}
            closeModal={closeModal}
          />
        </ModalUI>
      )}
    </>
  );
}

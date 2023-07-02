"use client";
import { useBoardStore } from "@/store/useBoardStore";
import { useModalStore } from "@/store/useModalStore";
import { Transition, Dialog } from "@headlessui/react";
import { useState, Fragment, useRef, FormEvent } from "react";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import Image from "next/image";
import { PhotoIcon, PlusIcon } from "@heroicons/react/24/solid";

function Modal() {
    const [closeModal, isOpen] = useModalStore((state) => [
        state.closeModal,
        state.isOpen,
    ]);

    const [setNewTodoInput,addTask ,newTodoInput,image,setImage,newTodoTaskType] = useBoardStore(
        (state) => [
            state.setNewTodoInput,
            state.addTask,
            state.newTodoInput,
            state.image,
            state.setImage,
            state.newTodoTaskType,

        ]
    );

    const imagePickerRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e:  FormEvent<HTMLFormElement>) =>{

       e.preventDefault();
        if (!newTodoInput) return;

        // // create a new task
        addTask(newTodoInput,newTodoTaskType, image );

        setImage(null);
        closeModal();
    }
    console.log(newTodoTaskType)

    //

    return (
        // Use the `Transition` component at the root level
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog  as="form"  onSubmit={handleSubmit}className="relative z-auto" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    {/* <div className="fixed inset-0 bg-black bg-opacity-25" /> */}
                    <div
                        className="fixed inset-0 bg-black/30"
                        aria-hidden="true"
                    />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 pb-2">
                                    Add a Task
                                </Dialog.Title>

                                {/* ... */}
                                <div className="mt-2">
                                    <input
                                        className="w-full border border-gray-300 rounded-md outline-none px-3 py-2"
                                        type="text"
                                        placeholder="Enter a task here..."
                                        onChange={(e) =>
                                            setNewTodoInput(e.target.value)
                                        }
                                        value={newTodoInput}
                                    />

                                    {/* radio group */}
                                </div>

                                <TaskTypeRadioGroup />

                                <div className="mt-2">
                                    <button
                                    type="button"
                                    onClick={() =>{
                                        imagePickerRef.current?.click()
                                    }} className="w-full border border-gray-300 rounded-md outline-none px-3 py-3">
                                        <PhotoIcon className="h-6 w-6 inline-block mr-2" />
                                        Upload Image
                                        <PlusIcon className="h-6 w-6 inline-block ml-4 items-center" />
                                    </button>
                                    {image && (
                                        <Image
                                            alt="upload image"
                                            src={URL.createObjectURL(image)}
                                            width={200}
                                            height={200}
                                            onClick={() => setImage(null)}
                                            className="w-full h-44 object-cover mt-2 hover:grayscale transition-all duration-150 cursor-not-allowed"
                                        />
                                    )}
                                    <input
                                        className=""
                                        type="file"
                                        hidden
                                        ref={imagePickerRef}
                                        onChange={(e) => {
                                            if (
                                                !e.target.files![0].type.startsWith(
                                                    "image/"
                                                )
                                            )
                                                return;
                                            setImage(e.target.files![0]);
                                        }}
                                    />
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        disabled={!newTodoInput}
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900
                                        hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500  disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed:cursor-not-allowed disabled:opacity-50 disabled:ring-0 disabled:ring-offset-0 disabled:ring-blue-500 disabled:ring-opacity-50
                                        "
                                        >
                                        Add Task
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default Modal;
